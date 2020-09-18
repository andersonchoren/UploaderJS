<?php

$error_empty_files = "Nenhum arquivo localizado";
$error_file_upload = "Não foi possível enviar o arquivo ";
$success_upload = "Upload realizado com sucesso!!!";
$uploadFileDir = './uploads/';
$upload_errors = array();

if (!empty($_FILES)) {
    //echo json_encode(array("result" => $_FILES));
    foreach ($_FILES["files"]["tmp_name"] as $key => $value) {
        $fileTmpPath = $_FILES['files']['tmp_name'][$key];
        $fileName = $_FILES['files']['name'][$key];
        $fileNameCmps = explode(".", $fileName);
        $fileExtension = strtolower(end($fileNameCmps));
        $newFileName = md5(time() . $fileName) . '.' . $fileExtension;
        $dest_path = $uploadFileDir . $newFileName;
        //echo $dest_path;
        if (!move_uploaded_file($fileTmpPath, $dest_path)) {
            $upload_errors[] = $error_file_upload . $fileName;
        }
    }

    if (count($upload_errors) > 0) {
        echo json_encode(array("error" => $upload_errors));
    } else {
        echo json_encode(array("success" => $success_upload));
    }
} else {
    echo json_encode(array("error" => $error_empty_files));
}
