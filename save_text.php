<?php
if (isset($_POST['text'])) {
    $id = 'shared_text';

    file_put_contents("texts/$id.txt", $_POST['text']);

    echo json_encode(['id' => $id]);
} else {
    http_response_code(400);
    echo "Error: Text parameter missing.";
}
?>
