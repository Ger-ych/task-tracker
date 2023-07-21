<?php

namespace frontend\controllers;

use common\models\User;
use Yii;
use yii\web\Controller;
use yii\web\UnauthorizedHttpException;

/**
 * Auth controller
 */
class AuthController extends Controller
{
    public function beforeAction($action)
    {
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
            throw new UnauthorizedHttpException('Неверное имя пользователя или пароль.');
        }

        $token = $user->access_token;
        if (empty($token)) {
            $user->generateAccessToken();
            $token = $user->access_token;
        }

        $role = Yii::$app->authManager->getRolesByUser($user->id);
        $roleName = reset($role)->name;
        
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        return [
            'token' => $token,
            'username' => $user->username,
            'role' => $roleName,
        ];
    }
}