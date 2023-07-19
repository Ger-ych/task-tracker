<?php

namespace backend\models;

use Yii;
use yii\base\Model;
use common\models\User;

/**
 * User update form
 */
class UserUpdateForm extends Model
{
    public $username;
    public $email;
    public $git_profile_link;
    public $password;

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

        return $user->save();
    }
}
