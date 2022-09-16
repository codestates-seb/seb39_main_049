package server.question.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import server.question.entity.Question;
import server.question.repository.QuestionRepository;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;

    public void createdQuestion(Question question) {
        // TODO: JWT에서 user 정보 조회 후 question에 저장
        questionRepository.save(question);
    }

    public Question findQuestion(long questionId) throws Exception {
        return findVerifiedQuestion(questionId);
    }

    public Page<Question> findQuestions(int page, int size) {
        return questionRepository.findAll(PageRequest.of(page, size));
    }

    public void updateQuestion(Question question) throws Exception {
        Question updateQuestion = findVerifiedQuestion(question.getQuestionId());
        updateQuestion.setContent(question.getContent());
        updateQuestion.setMainCategory(question.getMainCategory());
        updateQuestion.setSubCategory(question.getSubCategory());
        questionRepository.save(updateQuestion);
    }

    public void deleteQuestion(long questionId) throws Exception {
        Question question = findVerifiedQuestion(questionId);
        questionRepository.delete(question);
    }

    public Question findVerifiedQuestion(long questionId) throws Exception {
        Optional<Question> question = questionRepository.findById(questionId);
        return question.orElseThrow(Exception::new);
    }
}