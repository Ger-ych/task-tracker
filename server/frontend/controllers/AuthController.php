<?php

namespace frontend\controllers;

use common\models\User;
use Yii;
use yii\web\Controller;

/**
 * Auth controller
 */
class AuthController extends Controller
{
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
        
        return [
            'token' => $token,
            'username' => $user->username,
        ];
    }
}