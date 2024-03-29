import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  // 페이지가 로드될 때 로그인 상태를 확인하고 상태를 업데이트
  useEffect(() => {
    const storedLoggedIn = sessionStorage.getItem("loggedIn");
    if (storedLoggedIn) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

    // 로그아웃 시 세션 스토리지에서 로그인 상태 제거
    const handleLogout = () => {
      sessionStorage.removeItem("loggedIn");
      sessionStorage.removeItem("userData"); //0210 상호형 추가
      setLoggedIn(false);
      navigate("/"); //0210 상호형 추가
    };

    // 헤더 스크롤 모션
    let thisScroll = 0;

    useEffect(() => {
      const handleScroll = () => {
        const isScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector("header");
  
        if (isScrollTop > thisScroll) { // down
          if (isScrollTop > 0) {
            if (header && isScrollTop > 100) {
              if (!header.classList.contains("hover")) {
                header.classList.add("hide");
              }
            }
          }
        }
        if (isScrollTop < thisScroll) { // up
          if (header) {
            header.classList.remove("hide");
          }
        }
        thisScroll = isScrollTop;
      };
  
      window.addEventListener("scroll", handleScroll);
  
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, []);
  
    // 비로그인 유저 라우팅 시도시 경고문구 출력
    const navigateWithLoginCheck = (path) => {
      if (!loggedIn) {
        alert("로그인이 필요한 서비스입니다.");
        // 로그인 페이지로 이동하거나, 현재 페이지에 머물게 할 수 있습니다.
        navigate('/Login'); // 로그인 페이지로 바로 이동하는 경우
      } else {
        navigate(path);
      }
    };
    
  return (
    <header>
      <h1 className="logo"><button onClick={()=>{navigate('/')}}></button></h1>
      <nav>
        <div className="for-bg">
          <div className="gnb-wrap">
            <ul className="gnb">
              {/* <li>
                <button className="one-link" onClick={()=>{navigate('/carbonNeutrality')}}>탄소 중립이란?</button>
              </li> */}
              <li>
                {/* <a className="one-link" href=""><button className="one-link" onClick={()=>{navigate('/campaign')}}>캠페인</button></a> */}
                <a className="one-link" href=""><button className="one-link" onClick={()=>navigateWithLoginCheck('/campaign')}>캠페인</button></a>
              </li>
              <li>
                {/* <a className="one-link" href=""><button className="one-link" onClick={()=>{navigate('/carbonFootprint')}}>탄소발자국</button></a> */}
                <a className="one-link" href=""><button className="one-link" onClick={()=>navigateWithLoginCheck('/carbonFootprint')}>탄소발자국</button></a>
              </li>
              <li>
                <a className="one-link" href=""><button className="one-link" onClick={()=>navigateWithLoginCheck('/mypage')}>MyPage</button></a>
              </li>
            </ul>
          </div>

          {/* <button type="button" className="btn-menu-mo" title="메뉴 열기">햄버거버튼</button>
          <button type="button" className="btn-close-mo" title="메뉴 닫기"></button> */}
        </div>

        {/* 로그인, 회원가입 버튼 임시 구현 */}
        <div className='utils'>
          {loggedIn ? (
            <>
              <button className="LoginBtn" onClick={handleLogout}>
                로그아웃
              </button>{"  "}
              <button>
                <Link to="/modify">정보 수정</Link>
              </button>
            </>
          ) : (
            // 로그아웃 상태일 때 로그인과 회원가입 버튼 표시
            <>
              <button className="LoginBtn">
                <Link to="/Login">로그인</Link>
              </button>{" "}
              <button>
                <Link to="/Register">회원가입</Link>
              </button>
              <br />
            </>
          )}
        </div>
      </nav>

      
    </header>
  );
};

export default Header;