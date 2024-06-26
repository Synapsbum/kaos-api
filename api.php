<?php
$serverName = "185.72.9.249";
$connectionOptions = array(
    "Database" => "KaosCheats",
    "Uid" => "sa",
    "PWD" => "159753CodeX!"
);

// Veritabanına bağlan
try {
    $conn = sqlsrv_connect($serverName, $connectionOptions);
    if ($conn === false) {
        throw new Exception("Veritabanı bağlantısı başarısız.");
    }

    // Kullanıcı bilgisini getiren fonksiyon
    function getUser($username, $conn) {
        $sql = "SELECT * FROM Users WHERE ID = ?";
        $params = array($username);
        $stmt = sqlsrv_query($conn, $sql, $params);
        if ($stmt === false) {
            throw new Exception("Veritabanı sorgusu başarısız.");
        }
        $user = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);
        sqlsrv_free_stmt($stmt);
        return $user;
    }

    // Kullanıcı bilgisini al
    if ($_SERVER['REQUEST_METHOD'] === 'GET') 
    {
        if($_GET['Action'] === 'GetUser') 
        {
            $username = $_GET['username'];
            $user = getUser($username, $conn);
            if ($user) {
                header('Content-Type: application/json');
                echo json_encode($user);
            } else {
                echo json_encode(array("error" => "USER_NOT_FOUND"));
            }
        }
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(array("error" => $e->getMessage()));
}

// Veritabanı bağlantısını kapat
if (isset($conn)) {
    sqlsrv_close($conn);
}

?>
