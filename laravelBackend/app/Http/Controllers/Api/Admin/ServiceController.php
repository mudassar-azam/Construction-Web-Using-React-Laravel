<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;

class ServiceController extends Controller
{
    public function index()
    {
        $services = Service::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $services
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $service = new Service();
        $service->title = $request->title;
        $service->short_des = $request->short_des;
        $service->slug = Str::slug($request->slug);
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();

        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$service->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/services/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/services/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $service->image = $fileName;
                $service->save();
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Service stored successfully'
        ]);
    }

    public function show($id)
    {
        $service = Service::find($id);

        if($service ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Service not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $service
        ]);
    }

    public function update(Request $request, $id)
    {
        $service = Service::find($id);

        if($service ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Service not found'
            ]);
        }
        
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:services,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $service->title = $request->title;
        $service->short_des = $request->short_des;
        $service->slug = Str::slug($request->slug);
        $service->content = $request->content;
        $service->status = $request->status;
        $service->save();

        if($request->imageId > 0){

            $oldImage = $service->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$service->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/services/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/services/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $service->image = $fileName;
                $service->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/services/large/'.$oldImage));
                    File::delete(public_path('uploads/services/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Service update successfully'
        ]);
    }

    public function destroy($id)
    {
        $service = Service::find($id);

        if($service ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Service not found'
            ]);
        }

        $service->delete();
        return response()->json([
            'status' => true,
            'errors' => 'Service deleted successfully'
        ]);
    }
}
