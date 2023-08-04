<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use common\models\Project;

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

    public function actionList()
    {
        $user = Yii::$app->user->identity;
        $tasks = $user->getTasks()->all();

        $tasksWithProjectName = [];
        foreach ($tasks as $task) {
            $taskData = $task->toArray();
            $project = Project::findOne($task->project_id);
            if ($project) {
                $taskData['project_name'] = $project->name;
            } else {
                $taskData['project_name'] = 'Unknown';
            }
            $tasksWithProjectName[] = $taskData;
        }

        return $tasksWithProjectName;
    }
}