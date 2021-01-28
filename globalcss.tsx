const GlobalCss = (props) => ( <style jsx global>{`

body { margin: 0 }

.page-layout {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: roboto;
    text-align: center;
}

.page-layout-contain {
    text-align: left;
    padding: 30px;
}

.margin {
    margin: 20px;
}

.padding {
    padding-left: 20px;
    padding-right: 20px;
}

.shadow {
    -webkit-box-shadow: 4px 3px 20px -1px rgba(0,0,0,0.75);
    -moz-box-shadow: 4px 3px 20px -1px rgba(0,0,0,0.75);
    box-shadow: 4px 3px 20px -1px rgba(0,0,0,0.75);
}

a {
    text-decoration: none
}

li a {
display: block;
color: white;
text-align: center;
padding: 14px 16px;
text-decoration: none;
}

/* Change the link color to #111 (black) on hover */
li a:hover {
    background-color: #111;
}


`}</style> )

export default GlobalCss