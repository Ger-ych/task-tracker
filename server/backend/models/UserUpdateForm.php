<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\User;
use yii\helpers\ArrayHelper;

/**
 * User update form
 */
class UserUpdateForm extends Model
{
    public $username;
    public $email;
    public $git_profile_link;
    public $password;
    public $role;

    private $_user;

    /**
     * UserUpdateForm constructor.
     * @param User $user
     * @param array $config
     */
    public function __construct($user, $config = [])
    {
        $this->_user = $user;

        $this->username = $user->username;
        $this->email = $user->email;
        $this->git_profile_link = $user->git_profile_link;

        $this->role = $this->getUserRole();

        parent::__construct($config);
    }


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'filter' => ['not', ['id' => $this->_user->id]], 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'filter' => ['not', ['id' => $this->_user->id]], 'message' => 'This email address has already been taken.'],
            
            ['git_profile_link', 'string'],

            ['password', 'string', 'min' => Yii::$app->params['user.passwordMinLength']],

            ['role', 'required'],
            ['role', 'in', 'range' => array_keys($this->getRoleOptions())],
        ];
    }

    /**
     * Update user.
     *
     * @param User $user
     * @return bool whether the update was successful
     */
    public function update()
    {
        if (!$this->validate()) {
            return false;
        }

        $user = $this->_user;

        $user->username = $this->username;
        $user->email = $this->email;
        $user->git_profile_link = $this->git_profile_link;

        if (!empty($this->password)) {
            $user->setPassword($this->password);
        }

        if ($user->save()) {
            $auth = Yii::$app->authManager;
            $role = $auth->getRole($this->role);
            $auth->revokeAll($user->id);
            $auth->assign($role, $user->id);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Get available role options for the dropdown.
     *
     * @return array
     */
    public function getRoleOptions()
    {
        $auth = Yii::$app->authManager;
        $roles = $auth->getRoles();
        return ArrayHelper::map($roles, 'name', 'name');
    }

    /**
     * Get the user's current role.
     *
     * @return string|null
     */
    private function getUserRole()
    {
        $auth = Yii::$app->authManager;
        $roles = $auth->getRolesByUser($this->_user->id);
        if (!empty($roles)) {
            return array_keys($roles)[0];
        }
        return null;
    }
}
