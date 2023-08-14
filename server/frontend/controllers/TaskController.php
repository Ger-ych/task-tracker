<?php

namespace frontend\controllers;

use Yii;
use yii\web\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;
use common\models\Project;
use common\models\Task;

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
                            'actions' => ['list', 'done'],
                            'allow' => true,
                            'roles' => ['@'],
                        ],
                        [
                            'actions' => ['list-by-project', 'delete', 'create', 'update'],
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
        $user = Yii::$app->user->identity;
        $tasks = $user->getTasks()->orderBy(['is_done' => SORT_ASC])->all();

        $tasksWithProject = [];
        foreach ($tasks as $task) {
            $taskData = $task->toArray();
            $project = Project::findOne($task->project_id);
            if ($project) {
                $taskData['project']['name'] = $project->name;
                $taskData['project']['repo_link'] = $project->repo_link;
                $taskData['project']['description'] = $project->description;
            } else {
                $taskData['project'] = [];
            }
            $tasksWithProject[] = $taskData;
        }

        return $tasksWithProject;
    }

    public function actionDone($id)
    {
        $task = Task::findOne($id);

        if (!$task) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого задания не существует.',
            ];
        }

        $user = Yii::$app->user->identity;
        if ($task->developer_id !== $user->id) {
            Yii::$app->response->setStatusCode(403);
            
            return [
                'error' => 'У вас недостаточно прав для выполнения данного действия.',
            ];
        }

        $task->is_done = 1;
        $task->save();

        return [];
    }

    public function actionListByProject($id)
    {
        $project = Project::findOne($id);
        if (!$project) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого проекта не существует.',
            ];
        }

        $tasks = $project->getTasks()->orderBy(['is_done' => SORT_ASC])->all();

        return $tasks;
    }

    public function actionDelete($id)
    {
        $task = Task::findOne($id);

        if (!$task) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого задания не существует.',
            ];
        }

        $task->delete();

        return [];
    }

    public function actionCreate()
    {
        $request = Yii::$app->getRequest();
        $task = new Task();

        if ($task->load($request->getBodyParams(), '') && $task->save()) {
            Yii::$app->response->setStatusCode(201);
            return $task->attributes;
        } else {
            Yii::$app->response->setStatusCode(400);
            return [
                'errors' => $task->errors,
            ];
        }
    }

    public function actionUpdate($id)
    {
        $request = Yii::$app->getRequest();
        $task = Task::findOne($id);

        if (!$task) {
            Yii::$app->response->setStatusCode(404);
            
            return [
                'error' => 'Такого задания не существует.',
            ];
        }

        if ($task->load($request->getBodyParams(), '') && $task->save()) {
            Yii::$app->response->setStatusCode(200);
            return $task->attributes;
        } else {
            Yii::$app->response->setStatusCode(400);
            return [
                'errors' => $task->errors,
            ];
        }
    }
}