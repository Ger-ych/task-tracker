<?php

/** @var yii\web\View $this */

$this->title = 'My Yii Application';
?>
<div class="site-index">

    <div class="jumbotron text-center bg-transparent">
        <h1 class="display-4">Admin Panel</h1>
        <p><a class="btn btn-lg btn-outline-secondary w-100" href="<?= \yii\helpers\Url::to(['project/index']) ?>">Projects &raquo;</a></p>
        <p><a class="btn btn-lg btn-outline-secondary w-100" href="<?= \yii\helpers\Url::to(['task/index']) ?>">Tasks &raquo;</a></p>
    </div>

    <div class="body-content">

        <div class="row">
            <div class="col-lg-4">
                
            </div>
        </div>

    </div>
</div>
