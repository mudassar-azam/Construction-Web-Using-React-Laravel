<?php

namespace App\Http\Controllers\Api\Admin;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\ImageManager;
use Intervention\Image\Drivers\Gd\Driver;
use App\Models\Blog;
use App\Models\TempImage;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::orderBy('created_at','DESC')->get();
        return response()->json([
            'status' => true,
            'data' => $blogs
        ]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:blogs,slug'
        ]);
        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $blog = new Blog();
        $blog->title = $request->title;
        $blog->short_des = $request->short_des;
        $blog->slug = Str::slug($request->slug);
        $blog->content = $request->content;
        $blog->author = $request->author;
        $blog->status = $request->status;
        $blog->save();

        if($request->imageId > 0){
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$blog->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/blogs/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/blogs/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $blog->image = $fileName;
                $blog->save();
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Blog stored successfully'
        ]);
    }

    public function show($id)
    {
        $blog = Blog::find($id);

        if($blog ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Blog not found'
            ]);
        }

        return response()->json([
            'status' => true,
            'data' => $blog
        ]);
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::find($id);

        if($blog ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Blog not found'
            ]);
        }
        
        $validator = Validator::make($request->all(),[
            'title' => 'required',
            'slug' => 'required|unique:blogs,slug,'.$id.',id'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'errors' => $validator->errors()
            ]);
        }

        $blog->title = $request->title;
        $blog->short_des = $request->short_des;
        $blog->slug = Str::slug($request->slug);
        $blog->content = $request->content;
        $blog->author = $request->author;
        $blog->status = $request->status;
        $blog->save();

        if($request->imageId > 0){

            $oldImage = $blog->image;
            $tempImage = TempImage::find($request->imageId);
            if($tempImage !== null){

                $extArray = explode('.' , $tempImage->name);
                $ext = last($extArray);
                $fileName = strtotime('now').$blog->id.'.'.$ext;

                $path = public_path('uploades/images/'.$tempImage->name);
                $destination_path = public_path('uploads/blogs/small/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->coverDown(500,600);
                $img->save($destination_path);

                $destination_path = public_path('uploads/blogs/large/'.$fileName);
                $manager = new ImageManager(Driver::class);
                $img = $manager->read($path);
                $img->scaleDown(1200);
                $img->save($destination_path);

                $blog->image = $fileName;
                $blog->save();

                if($oldImage != ''){
                    File::delete(public_path('uploads/blogs/large/'.$oldImage));
                    File::delete(public_path('uploads/blogs/small/'.$oldImage));
                }
            }
        }

        return response()->json([
            'status' => true,
            'errors' => 'Blog update successfully'
        ]);
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);

        if($blog ==  null){
            return response()->json([
                'status' => false,
                'errors' => 'Blog not found'
            ]);
        }

        $blog->delete();
        return response()->json([
            'status' => true,
            'errors' => 'Blog deleted successfully'
        ]);
    }
}
