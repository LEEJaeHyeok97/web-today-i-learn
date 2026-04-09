create database gump;
use gump;

show databases;

show tables;

CREATE TABLE `attendance` (
  `attendance_id` INT NOT NULL AUTO_INCREMENT,
  `crew_id` INT NOT NULL,
  `nickname` VARCHAR(50) NOT NULL,
  `attendance_date` DATE NOT NULL,
  `start_time` TIME,
  `end_time` TIME,
  PRIMARY KEY (`attendance_id`)
);

select * from attendance;

INSERT INTO `attendance`
(`crew_id`, `nickname`, `attendance_date`, `start_time`, `end_time`)
VALUES
	(1, '검프', '2025-03-04', '09:45', '18:10');

INSERT INTO `attendance` (`crew_id`, `nickname`, `attendance_date`, `start_time`, `end_time`)
VALUES
  (1, '검프', '2025-03-04', '09:45', '18:10'),
  (1, '검프', '2025-03-05', '09:50', '18:05'),
  (1, '검프', '2025-03-06', '09:59', '18:02'),
  (2, '구구', '2025-03-04', '10:01', '18:01'),
  (3, '네오', '2025-03-04', '09:59', '18:00'),
  (4, '브라운', '2025-03-04', '09:59', '18:00');
  
SELECT * FROM `attendance`;

SELECT `nickname`, `attendance_date`, `start_time` FROM `attendance`;

SELECT `nickname`, `attendance_date`, `start_time`
FROM `attendance`
WHERE `crew_id` = 1
AND `attendance_date` > '2025-03-05'
OR `crew_id` = 2;
-- AND 연산자가 OR 연산자보다 우선순위가 높다. 

UPDATE `attendance`
SET `start_time`= '10:00', `end_time` = '18:00'
WHERE `crew_id` = 1 AND `attendance_date` = '2025-03-04';
SET SQL_SAFE_UPDATES = 0;

DELETE FROM `attendance`
WHERE `crew_id` = 1 AND `attendance_date` = '2025-03-04';

SELECT DISTINCT `nickname` FROM `attendance`;

SELECT `nickname`, COUNT(`attendance_date`) FROM `attendance`
GROUP BY `nickname`;

SELECT `nickname`, COUNT(`attendance_date`)
FROM `attendance`
GROUP BY `nickname`
HAVING COUNT(`attendance_date`) >= 2;

SELECT * FROM `attendance`
ORDER BY `start_time` ASC;

SELECT * FROM `attendance` LIMIT 3;

SELECT `nickname`, COUNT(`attendance_date`) AS days
FROM `attendance`
WHERE `start_time` <= '10:00'
GROUP BY `nickname`
HAVING COUNT(`attendance_date`) >= 3
ORDER BY days DESC
LIMIT 10;

CREATE TABLE `crew` (
	`crew_id` INT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50) NOT NULL,
    PRIMARY KEY(`crew_id`)
);

ALTER TABLE `crew` ADD PRIMARY KEY(`crew_id`);

SELECT a.`nickname` AS crew_name, a.`attendance_date`AS date
FROM `attendance` AS a;

INSERT INTO `crew` (crew_id, nickname) VALUES
	(1, '검프'),
    (2, '구구'),
    (3, '네오'),
    (5, '브리');

select * from crew;


SELECT c.`nickname`, a.`attendance_date`, a.`start_time`
FROM `crew` AS c
INNER JOIN `attendance` AS a ON c.crew_id = a.crew_id;



show tables;
drop table crew;

CREATE TABLE attendance (
  attendance_id INT NOT NULL AUTO_INCREMENT,
  crew_id INT NOT NULL,
  nickname VARCHAR(50) NOT NULL,
  attendance_date DATE NOT NULL,
  start_time TIME,
  end_time TIME,
  PRIMARY KEY (attendance_id)
);



-- 정규화 이전 상태: attendance(crew_id, nickname, attendance_date, start_time, end_time)
-- crew_id와 nickname 매핑:
-- 1=검프, 2=구구, 3=네오, 4=브라운, 5=브리, 6=포비,
-- 7=워니, 8=리사, 9=제임스, 10=류시, 11=디노, 12=시지프

INSERT INTO attendance (crew_id, nickname, attendance_date, start_time, end_time) VALUES

  -- 검프(crew_id=1)
  (1, '검프', '2025-03-04', '09:45', '18:10'),
  (1, '검프', '2025-03-05', '09:50', '18:05'),
  (1, '검프', '2025-03-06', '09:59', '18:02'),
  (1, '검프', '2025-03-07', '10:00', '18:05'),
  (1, '검프', '2025-03-10', '12:55', '18:10'),
  (1, '검프', '2025-03-11', '09:58', '18:03'),
  (1, '검프', '2025-03-12', '09:55', '18:05'),

  -- 구구(crew_id=2)
  (2, '구구', '2025-03-04', '10:01', '18:01'),
  (2, '구구', '2025-03-05', '09:59', '18:00'),
  (2, '구구', '2025-03-06', '09:58', '17:30'),
  (2, '구구', '2025-03-07', '10:10', '18:00'),
  (2, '구구', '2025-03-11', '09:59', '18:01'),
  (2, '구구', '2025-03-12', '10:02', '18:10'),

  -- 네오(crew_id=3)
  (3, '네오', '2025-03-04', '09:59', '18:00'),
  (3, '네오', '2025-03-05', '10:03', '18:15'),
  (3, '네오', '2025-03-07', '10:00', '17:50'),
  (3, '네오', '2025-03-10', '13:05', '18:10'),
  (3, '네오', '2025-03-12', '09:55', '18:00'),

  -- 브라운(crew_id=4)
  (4, '브라운', '2025-03-04', '09:59', '18:00'),
  (4, '브라운', '2025-03-05', '09:59', '18:00'),
  (4, '브라운', '2025-03-06', '10:00', '18:00'),
  (4, '브라운', '2025-03-07', '10:00', '18:00'),
  (4, '브라운', '2025-03-10', '13:00', '18:00'),
  (4, '브라운', '2025-03-11', '09:59', '18:00'),
  (4, '브라운', '2025-03-12', '09:59', '18:00'),

  -- 브리(crew_id=5)
  (5, '브리', '2025-03-04', '10:20', '18:10'),
  (5, '브리', '2025-03-05', '09:58', '18:02'),
  (5, '브리', '2025-03-06', '09:59', '18:00'),
  (5, '브리', '2025-03-07', '10:02', '18:00'),
  (5, '브리', '2025-03-11', '09:55', '18:00'),
  (5, '브리', '2025-03-12', '09:57', '18:05'),

  -- 포비(crew_id=6)
  (6, '포비', '2025-03-04', '10:15', '17:58'),
  (6, '포비', '2025-03-05', '10:05', '18:05'),
  (6, '포비', '2025-03-10', '13:10', '18:10'),
  (6, '포비', '2025-03-11', '09:52', '18:01'),
  (6, '포비', '2025-03-12', '09:59', '18:00'),

  -- 워니(crew_id=7)
  (7, '워니', '2025-03-04', '10:10', '18:10'),
  (7, '워니', '2025-03-05', '09:50', '18:02'),
  (7, '워니', '2025-03-10', '12:59', '18:05'),
  (7, '워니', '2025-03-12', '10:05', '17:00'),

  -- 리사(crew_id=8)
  (8, '리사', '2025-03-04', '09:55', '18:00'),
  (8, '리사', '2025-03-05', '10:01', '18:03'),
  (8, '리사', '2025-03-06', '10:10', '17:40'),
  (8, '리사', '2025-03-07', '10:02', '18:05'),
  (8, '리사', '2025-03-10', '13:02', '18:00'),
  (8, '리사', '2025-03-11', '10:05', '18:10'),
  (8, '리사', '2025-03-12', '10:03', '18:00'),

  -- 제임스(crew_id=9)
  (9, '제임스', '2025-03-04', '09:55', '18:00'),
  (9, '제임스', '2025-03-05', '09:59', '18:00'),
  (9, '제임스', '2025-03-06', '09:59', '18:10'),
  (9, '제임스', '2025-03-07', '10:05', '18:00'),
  (9, '제임스', '2025-03-10', '12:59', '17:50'),
  (9, '제임스', '2025-03-11', '09:55', '18:00'),
  (9, '제임스', '2025-03-12', '10:01', '18:00'),

  -- 류시(crew_id=10)
  (10, '류시', '2025-03-04', '10:04', '18:00'),
  (10, '류시', '2025-03-05', '10:02', '18:02'),
  (10, '류시', '2025-03-06', '09:45', '18:05'),
  (10, '류시', '2025-03-07', '10:10', '18:00'),
  (10, '류시', '2025-03-10', '13:03', '17:40'),
  (10, '류시', '2025-03-11', '09:57', '18:10'),
  (10, '류시', '2025-03-12', '09:59', '17:30'),

  -- 디노(crew_id=11)
  (11, '디노', '2025-03-04', '09:59', '18:00'),
  (11, '디노', '2025-03-05', '10:10', '18:00'),
  (11, '디노', '2025-03-06', '09:57', '18:05'),
  (11, '디노', '2025-03-07', '10:00', '18:03'),
  (11, '디노', '2025-03-10', '12:57', '18:00'),
  (11, '디노', '2025-03-11', '09:55', '18:00'),
  (11, '디노', '2025-03-12', '10:03', '18:05'),

  -- 시지프(crew_id=12)
  (12, '시지프', '2025-03-04', '09:52', '18:05'),
  (12, '시지프', '2025-03-05', '09:55', '18:00'),
  (12, '시지프', '2025-03-06', '10:15', '18:00'),
  (12, '시지프', '2025-03-07', '10:03', '17:59'),
  (12, '시지프', '2025-03-10', '12:58', '18:10'),
  (12, '시지프', '2025-03-11', '09:55', '18:00'),
  (12, '시지프', '2025-03-12', '10:10', '18:10');
  
  SELECT * FROM attendance;
  
-- 문제 1: 테이블 생성하기 (CREATE TABLE)
-- 1. `attendance` 테이블은 중복된 데이터가 쌓이는 구조다. 중복된 데이터는 어떤 컬럼인가?
-- 나의 답변: crew_id, nickname

-- 2. `attendance` 테이블에서 중복을 제거하기 위해 `crew` 테이블을 만들려고 한다. 어떻게 구성해 볼 수 있을까?
-- 나의 답변: crew (crew_id, nickname)

-- 3. `crew` 테이블에 들어가야 할 크루들의 정보는 어떻게 추출할까?(hint: DISTINCT)
-- 나의 답변: SELECT DISTINCT `nickname` FROM `attendance`;
SELECT DISTINCT `nickname` FROM `attendance`;

-- 4. 최종적으로 crew 테이블 생성:
-- 나의 답변: 
CREATE TABLE `crew` (
	`crew_id` INT NOT NULL AUTO_INCREMENT,
    `nickname` VARCHAR(50),
    PRIMARY KEY (`crew_id`)
);

show tables;
select * from crew;

-- 5. attendance 테이블에서 크루 정보를 추출해서 crew 테이블에 삽입하기:
-- 나의 답변:
INSERT INTO `crew` (crew_id, nickname) SELECT DISTINCT crew_id, nickname FROM `attendance`;

-- 문제 2: 테이블 컬럼 삭제하기 (ALTER TABLE)
-- 1. crew 테이블을 만들고 중복을 제거했다. attendance에서 불필요해지는 컬럼은?
-- 나의 답변: crew_id, nickname crew_id는 fk로 쓰기 위해 nickname만 중복 제거
-- 2. 컬럼을 삭제하려면 어떻게 해야 하는가?
ALTER TABLE `attendance` 
DROP COLUMN `nickname`;

SELECT * FROM `attendance`;

-- 문제 3: 외래키 설정하기
-- `attendance` 에서 관심사의 분리를 통해 `crew` 테이블을 별도로 만들었다. 
-- 따라서, 나중에 nickname이 필요하다면 `crew` 테이블에서 확인하면 된다.

-- 그런데 잠재적인 문제가 남아 있다:
-- 만약, `crew` 테이블에는 `crew_id`가 `12`번인 크루가 존재하지 않지만, 
-- `attendance` 테이블에는 여전히 `crew_id`가 `12`번인 크루가 존재한다면?
-- 해당 크루가 중간에 퇴소했거나 누군가의 실수에 의해 레코드가 삭제됐거나
ALTER TABLE `attendance` ADD CONSTRAINT `FK_ATTENDANCE_CREW_ID`
FOREIGN KEY (`crew_id`) REFERENCES `crew` (`crew_id`);

-- 문제 4: 유니크 키 설정
-- 우아한 테크코스에서는 닉네임의 '중복'이 엄연히 금지된다. 그런데 현재 테이블에는 중복된 닉네임이 담길 수 있다. crew 테이블의 결함을 어떻게 해결할 수 있을까?
-- -> crew 테이블에 닉네임(nickname) 유니크 제약 조건을 걸어 중복을 방지한다.
ALTER TABLE `crew` ADD CONSTRAINT `uq_name` unique(`nickname`);
select * from crew;


-- DML (CRUD) 실습
-- 문제 5: 크루 닉네임 검색하기 (LIKE)
-- 3월 4일, 아침에 검프에게 어떤 크루가 상냥하게 인사했다. 그런데 검프도 구면인 것 같아서 닉네임 첫 글자가 디 라는 것은 떠올랐는데. 누구지?
SELECT * FROM `crew` WHERE `nickname` LIKE '디%';
-- 정답은 crew_id 11번 디노

--  문제 6: 출석 기록 확인하기(SELECT + WHERE)
-- 성실의 아이콘 어셔는 등굣길에 스마트폰을 떨어뜨리는 바람에 3월 6일 등하교 버튼을 누르지 못했다. 
-- 일단, 정말로 어셔의 기록이 누락됐는지 확인해 보자.
SELECT * FROM `attendance` WHERE `attendance_date` = '2026-03-06';
-- JOIN이 가능한 문제였다면 attendance와 crew를 crew_id로 조인하여 where 조건에 nickname='어셔' 조건을 추가했을 것입니다.

-- 문제 7: 누락된 출석 기록 추가(INSERT)
-- 확인해 보니, 어셔는 그날 출석 체크를 하지 못한 것이 사실로 드러났다. 사후 처리를 위해 출석을 추가해야 하는데 어떻게 추가해야 할까?
INSERT INTO `attendance` (`attendance_id`, `crew_id`, `attendance_date`, `start_time`, `end_time`) 
VALUES (76, 13, '2026-03-06', '09:31:00', '18:01:00');
-- crew 테이블에 어셔라는 닉네임이 이미 존재한다는 것을 가정한 경우.

-- 문제 8: 잘못된 출석 기록 수정 (UPDATE)
-- 주니는 3월 12일 10시 캠퍼스 정각에 도착했지만, 등교 버튼을 누르지 않았다. 뒤늦게 알게 됐는데 시각은 10시 5분.
-- 출석 시각으로 기록을 수정
UPDATE `attendance` SET `start_time` = '10:00:00' WHERE `nickname` = '주니';
-- attendance에 nickname 컬럼이 존재하는 경우를 가정. 만약 정규화 상태라면 crew와 조인 후 WHERE 조건을 걸어야 함.

-- 문제 9: 허위 출석 기록 삭제 (DELETE)
-- 검프는 아론이 3월 12일 캠퍼스에 도착하지 않은 점을 깨달았다. 
-- 해당 출석 기록을 삭제
DELETE FROM `attendance` WHERE `nickname` = '아론' AND `attendance_date` = '2026-03-12';

-- 문제 10: 출석 정보 조회하기 (JOIN)
-- 검프는 SQL이 익숙지 않아 crew 테이블에서 먼저 닉네임을 검색하고 해당 아이디 값을 찾아 직접 WHERE문에서 crew_id 항목의 값을 수동으로 입력해서 출석 기록을 조회했다.
-- 그런데 crew 테이블에서 crew_id를 기준으로 nickname 필드 값을 가져와서 함께 조회할 수도 있지 않을까?
-- nickname으로 crew_id값을 찾아서 해당 크루의 모든 출석기록을 조회한다.
SELECT * FROM `crew` JOIN `attendance` ON `crew`.`crew_id` = `attendance`.`crew_id` WHERE `crew`.`nickname` = '검프';

-- 문제 11: nickname으로 쿼리 처리하기 (서브 쿼리)
-- 검프는 SQL이 익숙지 않아 crew 테이블에서 먼저 닉네임을 검색하고 해당 아이디 값을 찾아 직접 WHERE 문에서 crew_id 항목의 값을 수동으로 입력했다.
-- 그런데 nickname을 입력하면 이를 기준으로 쿼리문을 처리할 수도 있지 않을까?
SELECT * FROM `attendance` WHERE `attendance`.`crew_id` = (SELECT `crew_id` FROM `crew` WHERE `nickname` = '류시');

-- 문제 12: 가장 늦게 하교한 크루 찾기
-- 3월 5일 가장 늦게 하교한 크루의 닉네임과 하교 시간을 조회.
select * from attendance;
SELECT `crew`.`nickname`, `attendance`.`end_time` FROM `crew` JOIN `attendance` ON `crew`.`crew_id` = `attendance`.`crew_id` WHERE `attendance`.`attendance_date` = '2025-03-05'
ORDER BY `attendance`.`end_time` DESC LIMIT 1;

-- 집계 함수 실습
-- 문제 13: 크루별로 '기록된' 날짜 수 조회
SELECT `crew_id`, COUNT(*) FROM `attendance` GROUP BY `attendance`.`crew_id`;

-- 문제 14: 크루별로 등교 기록이 있는(start_time IS NOT NULL) 날짜 수 조회
SELECT `crew_id`, COUNT(*) FROM `attendance` WHERE `attendance`.`start_time` IS NOT NULL GROUP BY `attendance`.`crew_id`;

-- 문제 15: 날짜별로 등교한 크루 수 조회
SELECT `attendance`.`attendance_date`, COUNT(*) FROM `attendance` GROUP BY `attendance`.`attendance_date`;

-- 문제 16: 크루별 가장 빠른 등교 시각(MIN)과 가장 늦은 등교 시각(MAX)
SELECT `crew_id`, MIN(`start_time`), MAX(`end_time`) FROM `attendance` GROUP BY `attendance`.`crew_id`;