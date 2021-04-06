# shopping_mall
React + Express + MongoDB 

cd C:/Users/yu/Desktop/study/react/inflearn/shopping_mall

## 주의 사항
**!화살표 함수!**
```html
<button onClick={()=>props.submitHandler(searchInputValue)}>Submit</button>
```
- 첫 번째는 인수와 함께 submitHandler를 호출하는 함수를 만들고 해당 함수를 onClick에 할당합니다.
- onClick에 매개변수가 필요할 경우 화살표 함수
- 이것은 함수 reference는 onClcik에 할당됨 

```html
<button onClick={props.submitHandler(searchInputValue)}>Submit</button>
```
- 두 번째는 즉시 (즉, 렌더링 단계 동안) 인수와 함께 submitHandler를 호출하고 반환 값을 onClick에 할당합니다. 
- (즉시 실행, onClick 안기다림)
https://stackoverflow.com/questions/62930655/whats-the-difference-between-onclick-function-and-onclick-functi