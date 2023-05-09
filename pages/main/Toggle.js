function Toggle ({ checked, onChange }) {
    return (  
            <label>
              <input type="checkbox" checked={checked} onChange={onChange} />
              <span className="slider round"></span>
            </label>
    );
}

export default Toggle;