<?php

namespace AdviceAppServer\BatchImport\Http\Controllers;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Maatwebsite\Excel\Concerns\Importable;
use Laravel\Nova\Http\Requests\NovaRequest;
use AdviceAppServer\BatchImport\Importer;

class UploadController
{
    use Importable;

    public function handle(NovaRequest $request)
    {
//        dd($request->all());

        $data = Validator::make($request->all(), [
            'file' => 'required|file',
        ])->validate();

        $file = $request->file('file');
        $extension = $file->getClientOriginalExtension();

//        dd($extension);
        try {
            (new Importer)->toCollection($file, null);
        } catch (\Exception $e) {
            return response()->json(['result' => 'error', 'message' => 'Désolé, nous n\'avons pas pu importer ce fichier'], 422);
        }

        // Store the file temporarily
        $hash = File::hash($file->getRealPath()).".".$extension;

        $file->move(storage_path('nova/batch-import/tmp'), $hash);

        return response()->json(['result' => 'success', 'file' => $hash]);
    }
}
