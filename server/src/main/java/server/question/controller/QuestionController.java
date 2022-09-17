package server.question.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.answer.entity.Answer;
import server.answer.service.AnswerService;
import server.comment.entity.Comment;
import server.comment.service.CommentService;
import server.question.dto.QuestionPostPutDto;
import server.question.entity.Question;
import server.question.mapper.QuestionMapper;
import server.question.service.QuestionService;
import server.response.MultiResponseDto;
import server.user.mapper.UserMapper;
import server.user.service.UserService;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/questions")
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    private final UserService userService;

    private final AnswerService answerService;

    private final UserMapper userMapper;

    private final CommentService commentService;

    @PostMapping
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostPutDto questionPostPutDto) throws Exception {
        // TODO: 로그인 유저 정보 가져오기
        long userId = 1L;
        Question question = questionMapper.questionPostPutDtoToQuestion(questionPostPutDto);
        question.setUser(userService.findUser(userId));
        questionService.createdQuestion(question);


        return new ResponseEntity("질문이 성공적으로 등록되었습니다.", HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@Positive @PathVariable("question-id") long questionId) throws Exception {
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity(questionMapper.questionToQuestionResponseDto(question, userMapper, answerService, commentService),
                HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<MultiResponseDto> getQuestions(@Positive @RequestParam int page,
                                                         @Positive @RequestParam int size) {
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, size);
        List<Question> questions = pageQuestions.getContent();
        return new ResponseEntity(new MultiResponseDto<>(questionMapper.questionsToQuestionsResponseDtos(questions), pageQuestions), HttpStatus.OK);
    }

    @PutMapping("/{question-id}")
    public ResponseEntity putQuestion(@Positive @PathVariable("question-id") long questionId,
                                          @Valid @RequestBody QuestionPostPutDto questionPostPutDto) throws Exception {
        Question question = questionMapper.questionPostPutDtoToQuestion(questionPostPutDto);
        question.setQuestionId(questionId);
        questionService.updateQuestion(question);
        return new ResponseEntity("질문 수정이 완료되었습니다.", HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@Positive @PathVariable("question-id") long questionId) throws Exception {
        questionService.deleteQuestion(questionId);
        return new ResponseEntity("질문 삭제가 완료되었습니다.", HttpStatus.OK);
    }
}