import { Container, Row, Col } from 'react-bootstrap';

const Welcome = () => {
    return (
        <Container>
            <Row>
                <Col><h1>Welcome to our website</h1></Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        Quisque at interdum quam. Integer vel facilisis turpis, eget 
                        venenatis massa. Praesent quis fermentum nunc. Cras nec posuere
                        neque, nec pellentesque tellus. Mauris a dolor at lacus 
                        malesuada cursus sed congue felis. Sed tincidunt mauris ut 
                        tellus mollis, ornare ultricies ex ullamcorper. Proin 
                        consectetur mi id hendrerit fringilla. Vestibulum ac massa id 
                        mauris aliquet mollis. Nunc laoreet mi vitae nunc venenatis 
                        pretium. Pellentesque nec malesuada urna, a auctor lorem. 
                        Mauris et porta nunc, sit amet elementum mi. Mauris consequat 
                        suscipit turpis ut suscipit. Mauris dictum accumsan laoreet. 
                        Donec vehicula tortor ac faucibus porttitor. Duis vel neque 
                        urna.
                    </p>
                    <p>
                        <img 
                            src="http://placeimg.com/1000/600/nature" 
                            className="rounded mx-auto d-block" 
                            alt="The natural world"
                        />
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <p>
                        Ut ultricies lorem non eros pulvinar commodo. In ultricies 
                        congue pellentesque. Sed et malesuada lacus, ut lobortis enim.
                        Donec pretium augue id sapien fringilla mollis. Vestibulum 
                        varius sapien quis odio porttitor ullamcorper. Nullam 
                        dignissim varius metus nec sollicitudin. Donec dignissim arcu 
                        nibh, consequat tristique velit dignissim nec. Aenean 
                        venenatis vestibulum enim sit amet venenatis. Integer gravida, 
                        lorem sed viverra vehicula, risus sapien tincidunt magna, id 
                        interdum urna ipsum tempus lectus. Mauris vestibulum ornare 
                        felis, vel placerat nisi pretium a. Quisque vestibulum a urna 
                        at posuere. Aenean eu sapien blandit, hendrerit mauris sit 
                        amet, hendrerit lacus. Curabitur ac varius leo.
                    </p>

                    <p>
                        Duis sed elementum tortor. Nulla et diam eu mi auctor auctor a 
                        ac turpis. Etiam ullamcorper nulla ac libero varius ultrices. 
                        Etiam ac porta enim. Donec luctus finibus lacus, sed tristique 
                        lectus cursus ut. Aenean quis enim eros. Nam mollis consequat 
                        tincidunt. Aenean aliquet turpis vitae eros facilisis, vel 
                        maximus ante vestibulum. Cras sem lacus, pretium sed ipsum 
                        eget, semper gravida nunc. Pellentesque dignissim, justo 
                        aliquam porttitor laoreet, dolor augue fermentum augue, mattis 
                        pharetra sapien nisl a libero. Etiam non sagittis lacus. 
                        Praesent luctus arcu sed elit lobortis lacinia. Nulla eu quam 
                        fringilla, eleifend ligula ac, hendrerit elit. Phasellus mi 
                        sem, elementum nec sagittis ultricies, lacinia non justo. 
                        Praesent efficitur ante et nisi imperdiet consequat.
                    </p>

                    <p>
                        Nam laoreet, mi nec rhoncus ullamcorper, arcu est consectetur 
                        est, auctor iaculis libero est nec felis. Interdum et malesuada 
                        fames ac ante ipsum primis in faucibus. Donec vel tellus vitae 
                        quam venenatis aliquet id ut massa. Donec finibus ligula sit 
                        amet semper placerat. Nulla ut lorem felis. Orci varius natoque 
                        penatibus et magnis dis parturient montes, nascetur ridiculus 
                        mus. Mauris imperdiet, velit quis imperdiet tincidunt, sem 
                        sapien sodales nibh, auctor laoreet leo nulla ut erat.
                    </p>

                    <p>
                        Quisque venenatis dapibus libero dignissim viverra. 
                        Pellentesque varius mauris sapien, vitae porttitor purus 
                        faucibus eget. Sed vestibulum iaculis metus tincidunt viverra. 
                        Sed diam eros, consectetur eget lectus eget, vulputate 
                        condimentum nisi. Curabitur quis fringilla leo, ut blandit 
                        lacus. Donec ante tellus, iaculis et aliquet sed, cursus nec 
                        lacus. Sed eu neque hendrerit ante ornare egestas. Vivamus 
                        dictum ultricies quam, id blandit velit sagittis sed. Etiam nec
                        nunc a ex porta ullamcorper. In enim lorem, faucibus finibus 
                        ullamcorper vitae, maximus vitae mi. Ut at sagittis metus. Donec 
                        elementum volutpat nulla, vitae varius eros rutrum at. Vivamus 
                        in dui lacinia, ultricies velit ornare, euismod justo. Proin at 
                        laoreet massa. Class aptent taciti sociosqu ad litora torquent 
                        per conubia nostra, per inceptos himenaeos.
                    </p>
                </Col>
            </Row>
        </Container>
    );
};

export default Welcome;