<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\Project;
use App\Models\TempImage;


class ProjectController extends Controller
{
    public function index()
    {
        $projects = Project::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $projects
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:projects,slug'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project = new Project();
        $project->title = $request->title;
        $project->short_des = $request->short_des;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$project->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $project->image = $fileName;
                $project->save();
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Project stored successfully'
        ]);
    }

    public function show($id)
    {
        $project = Project::find($id);

        if($project ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Project not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $project
        ]);
    }

    public function update(Request $request, $id)
    {
        $project = Project::find($id);

        if($project ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Project not found'
            ]);
        }
        
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:projects,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $project->title = $request->title;
        $project->short_des = $request->short_des;
        $project->slug = Str::slug($request->slug);
        $project->content = $request->content;
        $project->location = $request->location;
        $project->status = $request->status;
        $project->save();

        if($request->imageId > 0){

            $oldImage = $project->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$project->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/projects/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/projects/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $project->image = $fileName;
                $project->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/projects/large/'.$oldImage));
                    File::delete(public_path('uploads/projects/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Project update successfully'
        ]);
    }

    public function destroy($id)
    {
        $project = Project::find($id);

        if($project ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Project not found'
            ]);
        }

        $project->delete();
        return response()->json([
            'status' => true,
            'errors' => 'Project deleted successfully'
        ]);
    }
}
