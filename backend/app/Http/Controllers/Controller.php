<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Constants\AppConstants;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Response;
use Mockery\Exception;

abstract class Controller
{
    protected function paginateAndSort(Request $request, $model, $relations = [], $columnFilter = [])
    {
        $size = $request->input('size', AppConstants::PAGINATION_LIMIT);
        $page = $request->input('page', 1);
        $sort = $request->input('sort', 'id');
        $order = $request->input('order', 'DESC');
        $filter = trim($request->input('filter', ''));

        $query = $model::query();

        if (!empty($relations)) {
            $query->with($relations);
        }

        if (!empty($filter) && !empty($columnFilter)) {
            $query->where(function ($q) use ($filter, $columnFilter) {
                foreach ($columnFilter as $index => $column) {
                    if ($index === 0) {
                        $q->where($column, 'LIKE', '%' . $filter . '%');
                    } else {
                        $q->orWhere($column, 'LIKE', '%' . $filter . '%');
                    }
                }
            });
        }

        $query->orderBy($sort, $order);

        if ($size) {
            $totalItem = $query->count();
            $result = $query->paginate($size, ['*'], 'page', $page);
            return [
                'data' => $result->items(),
                'total_page' => $result->lastPage(),
                'number_item' => $result->count(),
                'total_item' => $totalItem,
            ];
        } else {
            $data = $query->get();
            return [
                'data' => $data,
                'total_page' => 1,
                'number_item' => $data->count(),
                'total_item' => $data->count(),
            ];
        }
    }

    protected function paginateAndSortByQuery(Request $request, $query, $relations = [])
    {
        $size = $request->input('size', AppConstants::PAGINATION_LIMIT);
        $page = $request->input('page', 1);
        $sort = $request->input('sort', 'id');
        $order = $request->input('order', 'DESC');

        if (!in_array($sort, Schema::getColumnListing($query->getModel()->getTable()))) {
            $sort = 'id';
        }

        if (!empty($relations)) {
            $query->with($relations);
        }

        $query->orderBy($sort, $order);

        if ($size) {
            $totalItem = $query->count();
            $result = $query->paginate($size, ['*'], 'page', $page);
            return [
                'data' => $result->items(),
                'total_page' => $result->lastPage(),
                'number_item' => $result->count(),
                'total_item' => $totalItem,
            ];
        } else {
            $data = $query->get();
            return [
                'data' => $data,
                'total_page' => 1,
                'number_item' => $data->count(),
                'total_item' => $data->count(),
            ];
        }
    }
}
