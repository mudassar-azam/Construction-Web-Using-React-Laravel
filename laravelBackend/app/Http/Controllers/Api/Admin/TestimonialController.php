<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\TempImage;
use App\Models\Testimonial;

class TestimonialController extends Controller
{
    public function index()
    {
        $testimonials = Testimonial::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $testimonials
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'testimonial' => 'required',
            'commented_by' => 'required'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial = new Testimonial();
        $testimonial->testimonial = $request->testimonial;
        $testimonial->commented_by = $request->commented_by;
        $testimonial->status = $request->status;
        $testimonial->save();

        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$testimonial->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/testimonials/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/testimonials/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $testimonial->image = $fileName;
                $testimonial->save();
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Testimonial stored successfully'
        ]);
    }

    public function show($id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Testimonial not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $testimonial
        ]);
    }

    public function update(Request $request, $id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Testimonial not found'
            ]);
        }
        
        $validator = Validator::make($request->all(),[
            'testimonial' => 'required',
            'commented_by' => 'required'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $testimonial->testimonial = $request->testimonial;
        $testimonial->commented_by = $request->commented_by;
        $testimonial->status = $request->status;
        $testimonial->save();

        if($request->imageId > 0){

            $oldImage = $testimonial->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$testimonial->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/testimonials/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/testimonials/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $testimonial->image = $fileName;
                $testimonial->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/testimonials/large/'.$oldImage));
                    File::delete(public_path('uploads/testimonials/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Testimonial update successfully'
        ]);
    }

    public function destroy($id)
    {
        $testimonial = Testimonial::find($id);

        if($testimonial ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Testimonial not found'
            ]);
        }

        $testimonial->delete();
        return response()->json([
            'status' => true,
            'errors' => 'Testimonial deleted successfully'
        ]);
    }
}
