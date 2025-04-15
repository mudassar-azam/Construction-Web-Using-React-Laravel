<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\TempImage;
use App\Models\TeamMember;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class TeamMemberController extends Controller
{
    public function index()
    {
        $team_members = TeamMember::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $team_members
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $team_member = new TeamMember();
        $team_member->name = $request->name;
        $team_member->job_title = $request->job_title;
        $team_member->status = $request->status;
        $team_member->save();

        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$team_member->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/team-members/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/team-members/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $team_member->image = $fileName;
                $team_member->save();
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Member stored successfully'
        ]);
    }

    public function show($id)
    {
        $team_member = TeamMember::find($id);

        if($team_member ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Member not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $team_member
        ]);
    }

    public function update(Request $request, $id)
    {
        $team_member = TeamMember::find($id);

        if($team_member ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Member not found'
            ]);
        }
        
        $validator = Validator::make($request->all(),[
            'name' => 'required',
            'job_title' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $team_member->name = $request->name;
        $team_member->job_title = $request->job_title;
        $team_member->status = $request->status;
        $team_member->save();

        if($request->imageId > 0){

            $oldImage = $team_member->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$team_member->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/team-members/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/team-members/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $team_member->image = $fileName;
                $team_member->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/team-members/large/'.$oldImage));
                    File::delete(public_path('uploads/team-members/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Member update successfully'
        ]);
    }

    public function destroy($id)
    {
        $team_member = TeamMember::find($id);

        if($team_member ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Member not found'
            ]);
        }

        $team_member->delete();
        return response()->json([
            'status' => true,
            'errors' => 'Member deleted successfully'
        ]);
    }
}
