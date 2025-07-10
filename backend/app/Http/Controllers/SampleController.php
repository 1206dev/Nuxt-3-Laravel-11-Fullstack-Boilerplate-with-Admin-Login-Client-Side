<?php

namespace App\Http\Controllers;

use App\Models\Sample;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class SampleController extends Controller
{
    public function index(Request $request)
    {
        $result = $this->paginateAndSort($request, Sample::class);
        return response()->json($result);
    }

    public function store(Request $request)
    {
        $data = $request->all();

        $sample = Sample::create($data);

        return response()->json($sample, 201);
    }

    public function show(Sample $sample)
    {
        return response()->json($sample);
    }

    public function update(Request $request, Sample $sample)
    {
        $data = $request->all();
        $sample->update($data);
        return response()->json($sample);
    }

    public function destroy(Sample $sample)
    {
        $sample->delete();
        return response()->json(['status' => true]);
    }
}
