<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use App\Models\TempImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;


class TempImageController extends Controller
{
    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => false,
                'errors' => $validator->errors('image')
            ]);
        }

        $img = $request->image;
        $ext = $img->getClientOriginalExtension();
        $imgname = strtotime('now') . '.' . $ext;

        $image = new TempImage();
        $image->name = $imgname;
        $image->save();

        $img->move(public_path('uploades/images'),$imgname);

        $path = public_path('uploades/images/'.$imgname);
        $destination_path = public_path('uploads/images/thumbnails/'.$imgname);
        $manager = new ImageManager(Driver::class);
        $img = $manager->read($path);
        $img->coverDown(300,300);
        $img->save($destination_path);

        return response()->json([
            'status' => true,
            'data' => $image,
            'message' => 'Image uploaded successfully'
        ]);
    }
}
