<?php
// Настройки подключения к базе данных
$host = '127.0.0.1';
$db = 'salon';
$user = 'root';
$pass_db = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$opt = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass_db, $opt);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['status' => 'error', 'message' => 'Ошибка подключения к БД: ' . $e->getMessage()]);
    exit;
}

// ============================================
// ОБРАБОТКА POST-ЗАПРОСОВ
// ============================================
if ($_POST !== null) {
    


    // Регистрация в users
    if (isset($_POST['name']) && isset($_POST['username']) && isset($_POST['email']) && isset($_POST['phone']) && isset($_POST['password'])) {
        try {
            $name = htmlspecialchars($_POST['name']);
            $username = htmlspecialchars($_POST['username']);
            $email = htmlspecialchars($_POST['email']);
            $phone = htmlspecialchars($_POST['phone']);
            $password = htmlspecialchars($_POST['password']);

            $stmt = $pdo->prepare("INSERT INTO users (name, username, email, phone, password) VALUES (?, ?, ?, ?, ?)");
            $stmt->bindParam(1, $name);
            $stmt->bindParam(2, $username);
            $stmt->bindParam(3, $email);
            $stmt->bindParam(4, $phone);
            $stmt->bindParam(5, $password);
            $stmt->execute();

            echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна!']);

        } catch (PDOException $e) {
            if ($e->getCode() == 23000) {
                http_response_code(400);
                echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким именем уже существует']);
            } else {
                http_response_code(500);
                echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
            }
        }
        exit;
    }
    

    // Вход (login)
    if (isset($_POST['action']) && $_POST['action'] === 'login') {
        try {
            $username = htmlspecialchars($_POST['username']);
            $password = htmlspecialchars($_POST['password']);

            $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
            $stmt->execute([$username, $password]);
            $user = $stmt->fetch();

            if ($user) {
                echo json_encode(['status' => 'success', 'message' => 'Вход выполнен!']);
            } else {
                http_response_code(401);
                echo json_encode(['status' => 'error', 'message' => 'Неверное имя пользователя или пароль']);
            }

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Связаться с нами
    if (isset($_POST['name']) && isset($_POST['phone']) && isset($_POST['email'])) {
        try {
            $name = htmlspecialchars($_POST['name']);
            $phone = htmlspecialchars($_POST['phone']);
            $email = htmlspecialchars($_POST['email']);
            $message = htmlspecialchars($_POST['message'] ?? '');

            $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)");
            $stmt->bindParam(1, $name);
            $stmt->bindParam(2, $phone);
            $stmt->bindParam(3, $email);
            $stmt->bindParam(4, $message);
            $stmt->execute();

            echo json_encode(['status' => 'success', 'message' => 'Сообщение отправлено! Мы свяжемся с вами.']);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка записи: ' . $e->getMessage()]);
        }
        exit;
    }

    // Запись на услугу
    if (isset($_POST['action']) && $_POST['action'] === 'submit_appointment') {
        try {
            $username = htmlspecialchars($_POST['username']);
            $service_id = $_POST['service_id'];
            $master_id = $_POST['master_id'];
            $date = $_POST['date'];
            $time = $_POST['time'];
            $phone = htmlspecialchars($_POST['phone']);

            $stmt = $pdo->prepare("INSERT INTO appointments (username, service_id, master_id, appointment_date, appointment_time, phone) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->execute([$username, $service_id, $master_id, $date, $time, $phone]);

            echo json_encode(['status' => 'success', 'message' => 'Вы успешно записаны!']);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Получение услуг
    if (isset($_POST['action']) && $_POST['action'] === 'get_services') {
        try {
            $stmt = $pdo->query("SELECT * FROM services");
            $services = $stmt->fetchAll();

            echo json_encode(['status' => 'success', 'services' => $services]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Получение мастеров
    if (isset($_POST['action']) && $_POST['action'] === 'get_masters') {
        try {
            $stmt = $pdo->query("SELECT * FROM masters");
            $masters = $stmt->fetchAll();

            echo json_encode(['status' => 'success', 'masters' => $masters]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Получение услуг для записи
    if (isset($_POST['action']) && $_POST['action'] === 'get_appointment_services') {
        try {
            $stmt = $pdo->query("SELECT id, title, price FROM services");
            $services = $stmt->fetchAll();

            echo json_encode(['status' => 'success', 'services' => $services]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Получение мастеров для записи
    if (isset($_POST['action']) && $_POST['action'] === 'get_appointment_masters') {
        try {
            $stmt = $pdo->query("SELECT id, name, specialization FROM masters");
            $masters = $stmt->fetchAll();

            echo json_encode(['status' => 'success', 'masters' => $masters]);

        } catch (PDOException $e) {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
        }
        exit;
    }

    // Неизвестный POST-запрос
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Неверный POST-запрос']);
    exit;
}

// // ============================================
// // ОБРАБОТКА GET-ЗАПРОСОВ
// // ============================================
// if ($_GET !== null) {
    
//     // Регистрация в users
//     if (isset($_GET['name']) && isset($_GET['username']) && isset($_GET['email']) && isset($_GET['phone']) && isset($_GET['password'])) {
//         try {
//             $name = htmlspecialchars($_GET['name']);
//             $username = htmlspecialchars($_GET['username']);
//             $email = htmlspecialchars($_GET['email']);
//             $phone = htmlspecialchars($_GET['phone']);
//             $password = htmlspecialchars($_GET['password']);

//             $stmt = $pdo->prepare("INSERT INTO users (name, username, email, phone, password) VALUES (?, ?, ?, ?, ?)");
//             $stmt->bindParam(1, $name);
//             $stmt->bindParam(2, $username);
//             $stmt->bindParam(3, $email);
//             $stmt->bindParam(4, $phone);
//             $stmt->bindParam(5, $password);
//             $stmt->execute();

//             echo json_encode(['status' => 'success', 'message' => 'Регистрация успешна!']);

//         } catch (PDOException $e) {
//             if ($e->getCode() == 23000) {
//                 http_response_code(400);
//                 echo json_encode(['status' => 'error', 'message' => 'Пользователь с таким именем уже существует']);
//             } else {
//                 http_response_code(500);
//                 echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//             }
//         }
//         exit;
//     }

//     // Вход (login)
//     if (isset($_GET['action']) && $_GET['action'] === 'login') {
//         try {
//             $username = htmlspecialchars($_GET['username']);
//             $password = htmlspecialchars($_GET['password']);

//             $stmt = $pdo->prepare("SELECT * FROM users WHERE username = ? AND password = ?");
//             $stmt->execute([$username, $password]);
//             $user = $stmt->fetch();

//             if ($user) {
//                 echo json_encode(['status' => 'success', 'message' => 'Вход выполнен!']);
//             } else {
//                 http_response_code(401);
//                 echo json_encode(['status' => 'error', 'message' => 'Неверное имя пользователя или пароль']);
//             }

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Связаться с нами
//     if (isset($_GET['name']) && isset($_GET['phone']) && isset($_GET['email'])) {
//         try {
//             $name = htmlspecialchars($_GET['name']);
//             $phone = htmlspecialchars($_GET['phone']);
//             $email = htmlspecialchars($_GET['email']);
//             $message = htmlspecialchars($_GET['message'] ?? '');

//             $stmt = $pdo->prepare("INSERT INTO contacts (name, phone, email, message) VALUES (?, ?, ?, ?)");
//             $stmt->bindParam(1, $name);
//             $stmt->bindParam(2, $phone);
//             $stmt->bindParam(3, $email);
//             $stmt->bindParam(4, $message);
//             $stmt->execute();

//             echo json_encode(['status' => 'success', 'message' => 'Сообщение отправлено! Мы свяжемся с вами.']);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка записи: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Получение услуг
//     if (isset($_GET['action']) && $_GET['action'] === 'get_services') {
//         try {
//             $stmt = $pdo->query("SELECT * FROM services");
//             $services = $stmt->fetchAll();

//             echo json_encode(['status' => 'success', 'services' => $services]);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Получение мастеров
//     if (isset($_GET['action']) && $_GET['action'] === 'get_masters') {
//         try {
//             $stmt = $pdo->query("SELECT * FROM masters");
//             $masters = $stmt->fetchAll();

//             echo json_encode(['status' => 'success', 'masters' => $masters]);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Получение услуг для записи
//     if (isset($_GET['action']) && $_GET['action'] === 'get_appointment_services') {
//         try {
//             $stmt = $pdo->query("SELECT id, title, price FROM services");
//             $services = $stmt->fetchAll();

//             echo json_encode(['status' => 'success', 'services' => $services]);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Получение мастеров для записи
//     if (isset($_GET['action']) && $_GET['action'] === 'get_appointment_masters') {
//         try {
//             $stmt = $pdo->query("SELECT id, name FROM masters");
//             $masters = $stmt->fetchAll();

//             echo json_encode(['status' => 'success', 'masters' => $masters]);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Запись на услугу
//     if (isset($_GET['action']) && $_GET['action'] === 'submit_appointment') {
//         try {
//             $username = htmlspecialchars($_GET['username']);
//             $service_id = $_GET['service_id'];
//             $master_id = $_GET['master_id'];
//             $date = $_GET['date'];
//             $time = $_GET['time'];
//             $phone = htmlspecialchars($_GET['phone']);

//             $stmt = $pdo->prepare("INSERT INTO appointments (username, service_id, master_id, appointment_date, appointment_time, phone) VALUES (?, ?, ?, ?, ?, ?)");
//             $stmt->execute([$username, $service_id, $master_id, $date, $time, $phone]);

//             echo json_encode(['status' => 'success', 'message' => 'Вы успешно записаны!']);

//         } catch (PDOException $e) {
//             http_response_code(500);
//             echo json_encode(['status' => 'error', 'message' => 'Ошибка: ' . $e->getMessage()]);
//         }
//         exit;
//     }

//     // Неизвестный GET-запрос
//     http_response_code(400);
//     echo json_encode(['status' => 'error', 'message' => 'Неверный GET-запрос']);
//     exit;
// }

// // Обработка неизвестного запроса
// http_response_code(400);
// echo json_encode(['status' => 'error', 'message' => 'Неверный запрос']);

// ?>
