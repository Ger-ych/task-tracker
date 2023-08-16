<?php

namespace frontend\controllers;

use common\models\User;
use Yii;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use yii\web\Controller;

/**
 * Auth controller
 */
class AuthController extends Controller
{
    /**
     * @inheritDoc
     */
    public function behaviors()
    {
        return [
            'authenticator' => [
                'class' => HttpBearerAuth::class,
                'only' => ['info']
            ],
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'actions' => ['login'],
                        'allow' => true,
                        'roles' => ['?'],
                    ],
                    [
                        'actions' => ['info'],
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }

    /**
     * Login with username and password.
     * If the username or password is incorrect, the status 401 will be returned.
     * @return \yii\web\Response
     */
    public function actionLogin()
    {   
        $request = Yii::$app->getRequest();
        $username = $request->getBodyParam('username');
        $password = $request->getBodyParam('password');

        $user = User::findByUsername($username);
        if (!$user || !$user->validatePassword($password)) {
            Yii::$app->response->setStatusCode(401);
            
            return [
                'error' => 'Неверное имя пользователя или пароль.',
            ];
        }

        $token = $user->access_token;
        if (empty($token)) {
            $user->generateAccessToken();
            $token = $user->access_token;
        }

        $role = Yii::$app->authManager->getRolesByUser($user->id);
        $roleName = reset($role)->name;
        
        return [
            'token' => $token,
            'username' => $user->username,
            'role' => $roleName,
        ];
    }

     /**
     * Getting information about a user
     * 
     * @return \yii\web\Response
     */
    public function actionInfo()
    {
        $user = Yii::$app->user->identity;

        return [
            'id' => $user->id,
            'username' => $user->username,
            'email' => $user->email,
            'git_profile_link' => $user->git_profile_link,
        ];
    }
}