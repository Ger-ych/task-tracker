<?php

namespace common\models;

use Yii;

/**
 * This is the model class for table "task".
 *
 * @property int $id
 * @property int $project_id
 * @property string $title
 * @property string|null $text
 * @property int|null $developer_id
 * @property int|null $is_done
 *
 * @property User $developer
 * @property Project $project
 */
class Task extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'task';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['project_id', 'title'], 'required'],
            [['project_id', 'developer_id', 'is_done'], 'integer'],
            [['text'], 'string'],
            [['title'], 'string', 'max' => 255],
            [['developer_id'], 'exist', 'skipOnError' => true, 'targetClass' => User::class, 'targetAttribute' => ['developer_id' => 'id']],
            [['project_id'], 'exist', 'skipOnError' => true, 'targetClass' => Project::class, 'targetAttribute' => ['project_id' => 'id']],
            ['is_done', 'default', 'value' => 0],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'project_id' => 'Project ID',
            'title' => 'Title',
            'text' => 'Text',
            'developer_id' => 'Developer ID',
            'is_done' => 'Is Done',
        ];
    }

    /**
     * Gets query for [[Developer]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getDeveloper()
    {
        return $this->hasOne(User::class, ['id' => 'developer_id']);
    }

    /**
     * Gets query for [[Project]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getProject()
    {
        return $this->hasOne(Project::class, ['id' => 'project_id']);
    }
}
