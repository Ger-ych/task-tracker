<?php
namespace console\controllers;

use Yii;
use yii\console\Controller;

class RbacController extends Controller
{
    public function actionInit()
    {
        $auth = Yii::$app->authManager;

        $admin = $auth->createRole('admin');
        $admin->description = 'Администратор';
        $auth->add($admin);

        $manager = $auth->createRole('manager');
        $manager->description = 'Менеджер';
        $auth->add($manager);

        $developer = $auth->createRole('developer');
        $developer->description = 'Разработчик';
        $auth->add($developer);

        $canAdmin = $auth->createPermission('canAdmin');
        $canAdmin->description = 'Право входа в административную часть';
        $auth->add($canAdmin);

        $auth->addChild($admin, $canAdmin);
    }

    public function actionSetAdmin($userId)
    {
        $auth = Yii::$app->authManager;

        $admin = $auth->getRole('admin');
        $auth->assign($admin, $userId);
    }
}