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
                            'actions' => ['list', 'view', 'delete', 'create', 'update'],
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
        $projects = Project::find()->orderBy(['id' => SORT_DESC])->all();

        return $projects;
    }

    public function actionView($id)
    {
        $project = Project::findOne($id);

        if (!$project) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого проекта не существует.',
            ];
        }

        return $project;
    }

    public function actionDelete($id)
    {
        $project = Project::findOne($id);

        if (!$project) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого проекта не существует.',
            ];
        }

        $project->delete();

        return [];
    }

    public function actionCreate()
    {
        $request = Yii::$app->getRequest();
        $project = new Project();

        if ($project->load($request->getBodyParams(), '') && $project->save()) {
            Yii::$app->response->setStatusCode(201);
            return $project->attributes;
        } else {
            Yii::$app->response->setStatusCode(400);
            return [
                'errors' => $project->errors,
            ];
        }
    }

    public function actionUpdate($id)
    {
        $request = Yii::$app->getRequest();
        $project = Project::findOne($id);

        if (!$project) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого проекта не существует.',
            ];
        }

        if ($project->load($request->getBodyParams(), '') && $project->save()) {
            Yii::$app->response->setStatusCode(200);
            return $project->attributes;
        } else {
            Yii::$app->response->setStatusCode(400);
            return [
                'errors' => $project->errors,
            ];
        }
    }
}