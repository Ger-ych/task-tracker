<?php

namespace frontend\controllers;

use common\models\User;
use Yii;
use yii\web\Controller;
use yii\filters\auth\HttpBearerAuth;
use yii\filters\AccessControl;

/**
 * Developer controller
 */
class DeveloperController extends Controller
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
        $developers = Yii::$app->authManager->getUserIdsByRole('developer');
        $users = User::find()->where(['id' => $developers])->all();

        $developerList = [];
        foreach ($users as $user) {
            $developerList[] = [
                'id' => $user->id,
                'username' => $user->username,
                'email' => $user->email,
                'git_profile_link' => $user->git_profile_link,
            ];
        }

        return $developerList;
    }
}