import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialogg';
import { Button } from '@/components/ui/buttonn';
import { Input } from '@/components/ui/input';

const Header = () => {
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = () => {
    if (password === 'bookdemo#12345') {
      window.open('bookreport.html', '_blank');
      setShowReportDialog(false);
      setPassword('');
    } else {
      alert('❌ Wrong password, try again!');
      setPassword('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePasswordSubmit();
    }
  };

  return (
    <>
      <header className="site-header">
        <div className="container nav">
          <div className="brand">
            <img src="assets/CoachBot-logo-1.png" alt="Book Club Logo" style={{ height: '50px', width: 'auto' }} />
          </div>
          <button className="nav-toggle" aria-label="Toggle navigation">☰</button>
          <Button 
            className="reportBtn" 
            onClick={() => setShowReportDialog(true)}
          >
            Report
          </Button>
        </div>
      </header>

      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="email-box">
          <DialogHeader>
            <DialogTitle>Please enter your admin password</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your password..."
              className="w-full"
            />
            <Button onClick={handlePasswordSubmit} className="w-full">
              Enter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Header;