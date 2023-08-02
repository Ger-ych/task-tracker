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
    
    public function beforeAction($action)
    {   
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        Yii::$app->response->headers->add('Access-Control-Allow-Origin', '*');
        
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

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