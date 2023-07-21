<?php

use yii\helpers\Html;
use yii\widgets\DetailView;

/** @var yii\web\View $this */
/** @var common\models\User $model */

$this->title = $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Users', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
\yii\web\YiiAsset::register($this);
?>
<div class="user-view">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Update', ['update', 'id' => $model->id], ['class' => 'btn btn-primary']) ?>
        <?= Html::a('Delete', ['delete', 'id' => $model->id], [
            'class' => 'btn btn-danger',
            'data' => [
                'confirm' => 'Are you sure you want to delete this item?',
                'method' => 'post',
            ],
        ]) ?>
    </p>

    <?= DetailView::widget([
        'model' => $model,
        'attributes' => [
            'id',
            'username',
            'access_token',
            //'auth_key',
            'password_hash',
            // 'password_reset_token',
            'email:email',
            // 'status',
            'created_at',
            'updated_at',
            // 'verification_token',
            'git_profile_link:ntext',
            [
                'attribute' => 'role',
                'value' => function ($model) {
                    $roles = Yii::$app->authManager->getRolesByUser($model->id);
                    return implode(', ', array_keys($roles));
                },
            ],
        ],
    ]) ?>

</div>
