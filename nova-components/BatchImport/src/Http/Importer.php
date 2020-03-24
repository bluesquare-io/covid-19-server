<?php

namespace AdviceAppServer\BatchImport;

use Laravel\Nova\Resource;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\SkipsErrors;
use Maatwebsite\Excel\Concerns\SkipsOnError;
use Maatwebsite\Excel\Concerns\SkipsFailures;
use Maatwebsite\Excel\Concerns\SkipsOnFailure;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Maatwebsite\Excel\Concerns\WithValidation;
use Maatwebsite\Excel\Concerns\WithBatchInserts;
use Maatwebsite\Excel\Concerns\WithChunkReading;

class Importer implements ToModel, WithValidation, WithHeadingRow, WithBatchInserts, WithChunkReading, SkipsOnFailure, SkipsOnError
{
    use Importable, SkipsFailures, SkipsErrors;

    /** @var Resource */
    protected $resource;
    protected $attributes;
    protected $attribute_map;
    protected $rules;
    protected $model_class;

    public function model(array $row)
    {
        [$model, $callbacks] = $this->resource::fill(
            new ImportRequest($this->mapRowDataToAttributes($row)),
            $this->resource::newModel()
        );

        return $model;
    }

    public function rules(): array
    {
        return $this->rules;
    }

    public function batchSize(): int
    {
        return 100;
    }

    public function chunkSize(): int
    {
        return 100;
    }

    /**
     * @return mixed
     */
    public function getAttributes()
    {
        return $this->attributes;
    }

    /**
     * @param mixed $attributes
     * @return Importer
     */
    public function setAttributes($attributes)
    {
        $this->attributes = $attributes;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getAttributeMap()
    {
        return $this->attribute_map;
    }

    /**
     * @param mixed $map
     * @return Importer
     */
    public function setAttributeMap($map)
    {
        $this->attribute_map = $map;

        return $this;
    }

    /**
     * @param mixed $rules
     * @return Importer
     */
    public function setRules($rules)
    {
        $this->rules = $rules;

        return $this;
    }

    /**
     * @return mixed
     */
    public function getModelClass()
    {
        return $this->model_class;
    }

    /**
     * @param mixed $model_class
     * @return Importer
     */
    public function setModelClass($model_class)
    {
        $this->model_class = $model_class;

        return $this;
    }

    public function setResource($resource)
    {
        $this->resource = $resource;

        return $this;
    }

    private function mapRowDataToAttributes($row)
    {
        $data = [];

        foreach ($this->attributes as $field) {
            $data[$field] = null;

            foreach ($this->attribute_map as $column => $attribute) {
                if (! isset($row[$column]) || $field !== $attribute) {
                    continue;
                }

                $data[$field] = $this->preProcessValue($row[$column]);
            }
        }

        return $data;
    }

    private function preProcessValue($value)
    {
        switch ($value) {
            case 'FALSE':
                return false;
                break;
            case 'TRUE':
                return true;
                break;
        }

        return $value;
    }
}
