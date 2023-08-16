<?php

namespace console\controllers;

use Yii;
use yii\console\Controller;
use common\models\User;
use yii\helpers\Console;

/**
 * Rbac controller
 */
class RbacController extends Controller
{
    /**
     * Initial configuration of RBAC roles
     * 
     * @return int
     */
    public function actionInit()
    {
        $auth = Yii::$app->authManager;
        
        if (!$auth->getRole('admin')) {
            $admin = $auth->createRole('admin');
            $admin->description = 'Администратор';
            $auth->add($admin);
        }
        else {
            $admin = $auth->getRole('admin');
        }

        if (!$auth->getRole('manager')) {
            $manager = $auth->createRole('manager');
            $manager->description = 'Менеджер';
            $auth->add($manager);
        }
        else {
            $manager = $auth->getRole('manager');
        }

        if (!$auth->getRole('developer')) {
            $developer = $auth->createRole('developer');
            $developer->description = 'Разработчик';
            $auth->add($developer);
        }
        else {
            $developer = $auth->getRole('developer');
        }

        if (!$auth->getPermission('canAdmin')) {
            $canAdmin = $auth->createPermission('canAdmin');
            $canAdmin->description = 'Право входа в административную часть';
            $auth->add($canAdmin);
        }
        else {
            $canAdmin = $auth->getPermission('canAdmin');
        }

        if (!$auth->hasChild($admin, $canAdmin)) {
            $auth->addChild($admin, $canAdmin);
        }

        return 0;
    }

    /**
     * Creating a user with the 'admin' role
     * 
     * @return int
     */
    public function actionCreateAdmin($username, $email, $password)
    {
        $user = new User([
            'username' => $username,
            'email' => $email,
        ]);

        $user->setPassword($password);
        $user->generateAuthKey();

        if (!$user->save()) {
            $this->stderr("Ошибка при создании пользователя: \n");
            foreach ($user->getErrors() as $errors) {
                foreach ($errors as $error) {
                    $this->stderr("- $error\n", Console::FG_RED);
                }
            }
            return 1;
        }

        $auth = Yii::$app->authManager;
        $adminRole = $auth->getRole('admin');
        $auth->assign($adminRole, $user->getId());

        $this->stdout("Пользователь '{$user->username}' успешно создан и назначен администратором.\n", Console::FG_GREEN);

        return 0;
    }
}