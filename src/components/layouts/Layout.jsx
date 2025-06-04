import './TwoSlotLayout.css'

function TwoSlotLayout({ 
  FirstComponent, 
  rightComponent, 
  layout = 'vertical', // 'horizontal', 'vertical', 'overlay'
  className = '',
  firstProps = {},
  secondProps = {},
  containerStyle = {},
  firstStyle = {},
  secondStyle = {}
}) {
  return (
    <div 
      className={className}
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