<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paginator
{

    /**
     * To manupule the size of the emails table
     *
     * @var int
     */
    const PAGE_SIZE = '5';

    /**
     * Holds the full size of the model
     * For example, the full amount of emails
     * The idea is to calculate it only once to save resources
     *
     * @var int
     */
    protected $totalSize;

    // public function __construct(Model $model)
    public function __construct(int $totalSize)
    {
        $this->totalSize = $totalSize;
    }

    public function getPageSize(): int
    {
        return self::PAGE_SIZE;
    }

    public function getSkipValue(int $page_id): int
    {
        return (self::PAGE_SIZE * ($page_id - 1));
    }

    public function getPagesNumber(): int
    {
        return ceil($this->totalSize / self::PAGE_SIZE);
    }
}