package server.answer.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import server.answer.dto.AnswerResponseDto;
import server.answer.entity.Answer;
import server.answer.mapper.AnswerMapper;
import server.answer.repository.AnswerRepository;
import server.comment.service.CommentService;
import server.question.entity.Question;
import server.response.MultiResponseDto;
import server.user.mapper.UserMapper;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

@RequiredArgsConstructor
@Service
public class AnswerService {

    private final AnswerRepository answerRepository;
    private final AnswerMapper answerMapper;

    public void createdAnswer(Answer answer) throws Exception {
        answerRepository.save(answer);
    }

    public void updateAnswer(Answer answer) throws Exception {
        Answer findAnswer = findVerifiedAnswer(answer.getAnswerId());
        findAnswer.setContent(answer.getContent());
        answerRepository.save(findAnswer);
    }

    public void updateVotes(long answerId, int votes) throws Exception {
        Answer findAnswer = findVerifiedAnswer(answerId);
        findAnswer.setVotes(votes);
        answerRepository.save(findAnswer);
    }

    public void deleteAnswer(long answerId) throws Exception {
        Answer findAnswer = findVerifiedAnswer(answerId);
        answerRepository.delete(findAnswer);
    }

    public Answer findVerifiedAnswer(long answerId) throws Exception {
        Optional<Answer> answer = answerRepository.findById(answerId);
        return answer.orElseThrow(Exception::new);
    }

//    public List<Answer> findAnswers(Question question) {
//        return answerRepository.findAllByQuestion(question);
//    }

    public List<AnswerResponseDto> findAnswers(Question question, UserMapper userMapper, CommentService commentService) {
        List<Answer> findAllAnswers = answerRepository.findAllByQuestion(question);
        List<AnswerResponseDto> answerResponseDtos = new ArrayList<>();
        for (Answer answer : findAllAnswers) {
            answerResponseDtos.add(answerMapper.answerToAnswerResponseDto(answer, userMapper, commentService));
        }
        return answerResponseDtos;
    }
}