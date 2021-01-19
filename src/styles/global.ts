import css from '@emotion/css';

export default function globalStyles() {
    return css`
        :root {
            user-select: none;
        }
        :root,
        body,
        #root {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            height: 100%;
        }
        body {
            position: relative;
            margin: 0;
            padding: 0;
            overflow: hidden;
            color: white;
            background: black;
        }
        .content {
            padding-top: 10px;
            transform: translate3d(50%, 0, 0);
            text-align: left;
            background: pink;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
        }
        .contenty {
            padding-top: 10px;
            transform: translate3d(50%, 0, 0);
            text-align: left;
            background: white;
            color: black;
            padding: 10px 15px;
            border-radius: 5px;
            // height: 200px;
            width: 240px;
        }
    `;
}
