<?php

namespace App\Http\Controllers\Api\Front;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;

class ProjectsController extends Controller
{
    public function index()
    {
        $projects = Project::where('status', 1)->orderBy('created_at', 'DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    public function latest(Request $request)
    {
        $projects = Project::where('status', 1)
            ->take($request->get('limit'))
            ->orderBy('created_at', 'DESC')->get();
            return response()->json([
                'status' => true,
                'data' => $projects
            ]);
    }

    public function project($id)
    {
        $project = Project::find($id);
        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }
}
