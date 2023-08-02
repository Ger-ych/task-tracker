<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;

/**
 * Task controller
 */
class TaskController extends Controller
{
    public function behaviors()
    {
        return array_merge(
            parent::behaviors(),
            [   
                'authenticator' => [
                    'class' => HttpBearerAuth::class,
                ],
                'access' => [
                    'class' => AccessControl::className(),
                    'rules' => [
                        [
                            'actions' => ['list'],
                            'allow' => true,
                            'roles' => ['@'],
                        ],
                    ],
                ],
            ]
        );
    }

    public function beforeAction($action)
    {   
        Yii::$app->response->format = \yii\web\Response::FORMAT_JSON;
        Yii::$app->response->headers->add('Access-Control-Allow-Origin', '*');
        
        $this->enableCsrfValidation = false;
        return parent::beforeAction($action);
    }

    public function actionList()
    {
        $user = Yii::$app->user->identity;
        $tasks = $user->getTasks()->all();

        return $tasks;
    }
}