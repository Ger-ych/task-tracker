<?php

use yii\db\Migration;

/**
 * Handles the creation of table `{{%task}}`.
 * Has foreign keys to the tables:
 *
 * - `{{%project}}`
 * - `{{%user}}`
 */
class m230718_153921_create_task_table extends Migration
{
    /**
     * {@inheritdoc}
     */
    public function safeUp()
    {
        $this->createTable('{{%task}}', [
            'id' => $this->primaryKey(),
            'project_id' => $this->integer()->notNull(),
            'title' => $this->string()->notNull(),
            'text' => $this->text(),
            'developer_id' => $this->integer(),
        ]);

        // creates index for column `project_id`
        $this->createIndex(
            '{{%idx-task-project_id}}',
            '{{%task}}',
            'project_id'
        );

        // add foreign key for table `{{%project}}`
        $this->addForeignKey(
            '{{%fk-task-project_id}}',
            '{{%task}}',
            'project_id',
            '{{%project}}',
            'id',
            'CASCADE'
        );

        // creates index for column `developer_id`
        $this->createIndex(
            '{{%idx-task-developer_id}}',
            '{{%task}}',
            'developer_id'
        );

        // add foreign key for table `{{%user}}`
        $this->addForeignKey(
            '{{%fk-task-developer_id}}',
            '{{%task}}',
            'developer_id',
            '{{%user}}',
            'id',
            'CASCADE'
        );
    }

    /**
     * {@inheritdoc}
     */
    public function safeDown()
    {
        // drops foreign key for table `{{%project}}`
        $this->dropForeignKey(
            '{{%fk-task-project_id}}',
            '{{%task}}'
        );

        // drops index for column `project_id`
        $this->dropIndex(
            '{{%idx-task-project_id}}',
            '{{%task}}'
        );

        // drops foreign key for table `{{%user}}`
        $this->dropForeignKey(
            '{{%fk-task-developer_id}}',
            '{{%task}}'
        );

        // drops index for column `developer_id`
        $this->dropIndex(
            '{{%idx-task-developer_id}}',
            '{{%task}}'
        );

        $this->dropTable('{{%task}}');
    }
}
