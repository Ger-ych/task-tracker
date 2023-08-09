<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use common\models\Project;

/**
 * Project controller
 */
class ProjectController extends Controller
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
                            'roles' => ['admin', 'manager'],
                        ],
                    ],
                ],
            ]
        );
    }

    public function actionList()
    {
        $projects = Project::find()->all();

        return $projects;
    }
}