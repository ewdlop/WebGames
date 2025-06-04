import './TwoSlotLayout.css'

function TwoSlotLayout({ 
  leftComponent, 
  rightComponent, 
  layout = 'horizontal', // 'horizontal', 'vertical', 'overlay'
  className = '',
  leftProps = {},
  rightProps = {},
  containerStyle = {},
  leftStyle = {},
  rightStyle = {}
}) {
  return (
    <div 
      className={`two-slot-layout ${layout} ${className}`}
      style={containerStyle}
    >
      <div 
        className="slot-left" 
        style={leftStyle}
      >
        {leftComponent && leftComponent(leftProps)}
      </div>
      
      <div 
        className="slot-right" 
        style={rightStyle}
      >
        {rightComponent && rightComponent(rightProps)}
      </div>
    </div>
  )
}

export default TwoSlotLayout 