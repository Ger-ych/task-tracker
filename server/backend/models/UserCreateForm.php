<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\User;
use yii\helpers\ArrayHelper;

/**
 * User create form
 */
class UserCreateForm extends Model
{
    public $username;
    public $email;
    public $git_profile_link;
    public $password;
    public $role;


    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            ['username', 'trim'],
            ['username', 'required'],
            ['username', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This username has already been taken.'],
            ['username', 'string', 'min' => 2, 'max' => 255],

            ['email', 'trim'],
            ['email', 'required'],
            ['email', 'email'],
            ['email', 'string', 'max' => 255],
            ['email', 'unique', 'targetClass' => '\common\models\User', 'message' => 'This email address has already been taken.'],
            
            ['git_profile_link', 'string'],

            ['password', 'required'],
            ['password', 'string', 'min' => Yii::$app->params['user.passwordMinLength']],

            ['role', 'required'],
            ['role', 'in', 'range' => array_keys($this->getRoleOptions())],
        ];
    }

    /**
     * Create user.
     *
     * @return bool whether the creating new account was successful
     */
    public function create()
    {
        if (!$this->validate()) {
            return false;
        }
        
        $user = new User();
        $user->username = $this->username;
        $user->email = $this->email;
        $user->setPassword($this->password);
        $user->generateAuthKey();
        $user->git_profile_link = $this->git_profile_link;

        if ($user->save()) {
            $auth = Yii::$app->authManager;
            $role = $auth->getRole($this->role);
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
}
