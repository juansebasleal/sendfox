<?php

/**
 * Class that serves as helper for simple pagination
 *
 * @author <jslealdi@gmail.com> 2019
 */

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

    /**
     * Class constructor
     *
     * @var int $totalSize
     *      the entire size of the data to be paginated
     */
    public function __construct(int $totalSize)
    {
        $this->totalSize = $totalSize;
    }

    /**
     * Get the page size (default 5)
     *
     * @return int
     */
    public function getPageSize(): int
    {
        return self::PAGE_SIZE;
    }

    /**
     * Useful to retrieve a subset of values
     * If 10 is returned, it skips the first 10 records, starting from the 11th one
     * Aka OFFSET
     *
     * @return int
     */
    public function getSkipValue(int $page_id): int
    {
        return (self::PAGE_SIZE * ($page_id - 1));
    }

    /**
     * Calculate and return the total number of pages
     *
     * @return int
     */
    public function getPagesNumber(): int
    {
        return ceil($this->totalSize / self::PAGE_SIZE);
    }
}