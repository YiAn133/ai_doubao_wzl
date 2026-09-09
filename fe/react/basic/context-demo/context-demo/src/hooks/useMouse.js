import{
    useState,
    useEffect
} from 'react'

const useMouse = () => {
    const [x, setX] = useState(null);
    const [y, setY] = useState(null);
    useEffect(() => {
        function handleMouseMove(e) {
            setX(e.clientX);
            setY(e.clientY);
        }

        document.addEventListener('mousemove', handleMouseMove);
        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
        }

    }, []);

    return {x , y};
}
export default useMouse;