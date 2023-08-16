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
    /**
     * @inheritDoc
     */
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

    /**
     * Lists all Project models.
     *
     * @return \yii\web\Response
     */
    public function actionList()
    {
        $projects = Project::find()->orderBy(['id' => SORT_DESC])->all();

        return $projects;
    }

    /**
     * Displays a single Project model.
     * If the model cannot be found, the status 404 will be returned.
     * @param int $id ID
     * @return \yii\web\Response
     */
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

    /**
     * Deletes an existing Project model.
     * If the model cannot be found, the status 404 will be returned.
     * @param int $id ID
     * @return \yii\web\Response
     */
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

    /**
     * Creates a new Project model.
     * 
     * @return \yii\web\Response
     */
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

    /**
     * Updates an existing Project model.
     * If the model cannot be found, the status 404 will be returned.
     * @param int $id ID
     * @return \yii\web\Response
     */
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