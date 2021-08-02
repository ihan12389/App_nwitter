# App_nwitter
**EXPO**를 이용하여 간단한 SNS 기능을 구현하는 연습.
  
# REACT-NATIVE
저번에 작성한 [nomadcoder의 nwitter](https://github.com/ihan12389/nwitter) 웹사이트의 기능을 앱에서도 구현해보았습니다.  
nwitter에서 사용한 데이터베이스와 동일한 데이터베이스를 사용하기 때문에 서로 연동됩니다.  
이번 개발은 EXPO의 개발 환경을 사용했습니다.  
제가 가지고 있는 갤럭시 S8+를 가지고 개발을 진행했기 때문에 아이폰이나 탭에서는 원활하게 작동하지 않을 수 있습니다.  
<BR>
### 사용
이번 개발에서는 다음과 같은 도구들을 사용했습니다.
* **REACT-NATIVE**
* **FIREBASE**
* **REDUX**  
<br>
  
### 기능  

기능은 저번 프로젝트와 거의 동일합니다.  
  
  
* **로그인 / 회원가입**  

![로그인](https://user-images.githubusercontent.com/64770899/127799824-5fc7d71c-0301-49c7-b048-383d1d003f47.gif)  

* **글 작성**  
* **글 수정 / 삭제**    
![글쓰기 수정](https://user-images.githubusercontent.com/64770899/127799846-a868c581-d11c-4f63-83ef-eddd7af6eaaa.gif)  
* **프로필 수정**    
* **로그아웃**    
![프로필 수정 로그아웃](https://user-images.githubusercontent.com/64770899/127799956-eae56483-a172-4f85-95c3-7b65ed5b90f9.gif)    
<br>
  
그 외에도 무한 스크롤, 스택 네비게이션, 뷰 페이저 등을 사용하여 앱을 보다 간편하게 구성하였습니다.  
<br>  <br>

  
### 패키지
아래는 제가 개발을 위해 사용한 패키지들입니다.  
<details>
<summary>package.json</summary>
<div markdown="1">       
<br>  

"@react-native-community/masked-view": "^0.1.11",  
"@react-native-firebase/app": "^12.3.0",  
"@react-navigation/bottom-tabs": "^5.11.11",  
"@react-navigation/core": "^5.15.3",  
"@react-navigation/drawer": "^5.12.5",  
"@react-navigation/native": "^5.9.4",  
"@react-navigation/stack": "^5.14.5",  
"expo": "~42.0.1",  
"expo-constants": "~11.0.1",  
"expo-image-picker": "~10.2.2",  
"expo-linear-gradient": "~9.2.0",  
"expo-splash-screen": "~0.11.2",  
"expo-status-bar": "~1.0.4",  
"firebase": "^8.8.0",  
"npm-check-updates": "^11.8.3",  
"react": "16.13.1",  
"react-dom": "16.13.1",  
"react-firebase": "^2.2.8",  
"react-native": "https://github.com/expo/react-native/archive/sdk-42.0.0.tar.gz",  
"react-native-gesture-handler": "^1.10.3",  
"react-native-get-random-values": "^1.7.0",  
"react-native-keyboard-aware-scroll-view": "^0.9.4",  
"react-native-linear-gradient": "^2.5.6",  
"react-native-pager-view": "^5.4.0",  
"react-native-reanimated": "^2.2.0",  
"react-native-safe-area-context": "^3.2.0",  
"react-native-screens": "^3.4.0",  
"react-native-web": "~0.13.12",  
"react-navigation": "^4.4.4",  
"react-navigation-stack": "react-navigation/stack",  
"react-redux": "^7.2.4",  
"redux": "^4.1.0",  
"redux-thunk": "^2.3.0",  
"styled-components": "^5.3.0",  
"uuid": "^8.3.2"  

</div>
</details>  
<br>
  
### 링크
개발을 하면서 배운 내용들은 블로그에 정리해두었습니다.  
https://lihano.tistory.com/1  
  
여기 앱은 EXPO를 통해서 실제로 테스트해 볼 수 있습니다.(expo 어플 필요)  
https://expo.dev/@lihano/app_nwitter
