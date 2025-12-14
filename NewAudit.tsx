import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Zap, Loader, CheckCircle, AlertTriangle } from 'lucide-react';
import { useAppContext } from '../store/AppContext';
import type { AuditLog, AuditType, Checkpoint, AuditReport } from '../types';

export const NewAudit: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { dispatch } = useAppContext();
  
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState('Initializing...');
  const [isComplete, setIsComplete] = useState(false);
  const [auditId, setAuditId] = useState('');

  const target = (location.state as any)?.target || 'Unknown Target';
  const auditType: AuditType = (location.state as any)?.auditType || 'mini-app';

  const steps = [
    'Initializing audit engine...',
    'Scanning target endpoint...',
    'Analyzing security headers...',
    'Checking authentication flow...',
    'Testing data validation...',
    'Reviewing error handling...',
    'Scanning for vulnerabilities...',
    'Generating security report...',
    'Finalizing analysis...',
  ];

  useEffect(() => {
    if (progress >= 100) {
      setIsComplete(true);
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 100);
        const stepIndex = Math.floor((newProgress / 100) * steps.length);
        setCurrentStep(steps[Math.min(stepIndex, steps.length - 1)]);
        return newProgress;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [progress]);

  useEffect(() => {
    if (isComplete && !auditId) {
      // Generate mock audit report
      const id = `audit_${Date.now()}`;
      const mockCheckpoints = generateMockCheckpoints(auditType);
      const report = calculateReport(mockCheckpoints);
      
      const newAudit: AuditLog = {
        id,
        target,
        type: auditType,
        score: report.score,
        status: report.score >= 80 ? 'PASS' : report.score >= 60 ? 'WARNING' : 'FAIL',
        timestamp: new Date(),
        details: `Comprehensive ${auditType} security audit completed`,
        report,
      };

      dispatch({ type: 'ADD_AUDIT', payload: newAudit });
      setAuditId(id);
    }
  }, [isComplete, auditId]);

  const generateMockCheckpoints = (type: AuditType): Checkpoint[] => {
    const baseCheckpoints: Checkpoint[] = [
      {
        id: 1,
        category: 'Authentication',
        title: 'Secure Authentication Flow',
        description: 'Validates proper authentication implementation',
        severity: 'critical',
        status: Math.random() > 0.3 ? 'PASS' : 'FAIL',
        remediation: 'Implement OAuth 2.0 with proper token validation',
      },
      {
        id: 2,
        category: 'Data Protection',
        title: 'Data Encryption',
        description: 'Checks if sensitive data is encrypted',
        severity: 'high',
        status: Math.random() > 0.2 ? 'PASS' : 'WARN',
        remediation: 'Use AES-256 encryption for sensitive data',
      },
      {
        id: 3,
        category: 'Input Validation',
        title: 'Input Sanitization',
        description: 'Verifies all user inputs are properly sanitized',
        severity: 'high',
        status: Math.random() > 0.25 ? 'PASS' : 'FAIL',
        remediation: 'Implement input validation and sanitization library',
      },
      {
        id: 4,
        category: 'API Security',
        title: 'Rate Limiting',
        description: 'Checks for proper API rate limiting',
        severity: 'medium',
        status: Math.random() > 0.3 ? 'PASS' : 'WARN',
        remediation: 'Implement rate limiting middleware',
      },
      {
        id: 5,
        category: 'Error Handling',
        title: 'Secure Error Messages',
        description: 'Ensures errors don\'t leak sensitive information',
        severity: 'medium',
        status: Math.random() > 0.4 ? 'PASS' : 'FAIL',
        remediation: 'Use generic error messages for production',
      },
    ];

    return baseCheckpoints;
  };

  const calculateReport = (checkpoints: Checkpoint[]): AuditReport => {
    const passedCount = checkpoints.filter(c => c.status === 'PASS').length;
    const failedCount = checkpoints.filter(c => c.status === 'FAIL').length;
    const score = Math.round((passedCount / checkpoints.length) * 100);

    const categoryScores: Record<string, number> = {};
    checkpoints.forEach(checkpoint => {
      if (!categoryScores[checkpoint.category]) {
        categoryScores[checkpoint.category] = 0;
      }
      if (checkpoint.status === 'PASS') {
        categoryScores[checkpoint.category] += 1;
      }
    });

    return {
      score,
      passedCount,
      failedCount,
      categoryScores,
      checkpoints,
    };
  };

  const handleViewReport = () => {
    if (auditId) {
      navigate(`/report/${auditId}`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-pixel text-retro-cyan mb-4">AUDIT IN PROGRESS</h1>
        <p className="text-retro-dim font-terminal">
          Target: <span className="text-white">{target}</span>
        </p>
        <p className="text-retro-dim font-terminal">
          Type: <span className="text-white uppercase">{auditType.replace('-', ' ')}</span>
        </p>
      </div>

      {/* Progress Card */}
      <div className="bg-retro-panel border-4 border-retro-purple p-8 shadow-pixel-purple">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="font-terminal text-retro-dim">PROGRESS</span>
            <span className="font-pixel text-retro-cyan">{Math.round(progress)}%</span>
          </div>
          <div className="h-8 bg-retro-dark border-4 border-retro-dim overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-retro-cyan to-retro-purple transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Current Step */}
        <div className="flex items-center justify-center gap-4 py-6">
          {!isComplete ? (
            <>
              <Loader className="text-retro-cyan animate-spin" size={32} />
              <span className="font-terminal text-xl text-white animate-pulse">
                {currentStep}
              </span>
            </>
          ) : (
            <>
              <CheckCircle className="text-retro-green" size={32} />
              <span className="font-terminal text-xl text-retro-green">
                AUDIT COMPLETE!
              </span>
            </>
          )}
        </div>

        {/* Analysis Log */}
        <div className="bg-retro-dark border-2 border-retro-dim p-4 font-terminal text-sm h-48 overflow-y-auto">
          {steps.slice(0, Math.floor((progress / 100) * steps.length) + 1).map((step, index) => (
            <div key={index} className="text-retro-green mb-1">
              [{new Date().toLocaleTimeString()}] {step}
            </div>
          ))}
        </div>

        {/* Action Button */}
        {isComplete && (
          <div className="mt-8">
            <button
              onClick={handleViewReport}
              className="w-full bg-retro-cyan hover:bg-retro-purple text-black hover:text-white font-pixel py-4 px-6 border-4 border-black transition-all shadow-pixel flex items-center justify-center gap-2"
            >
              <Zap size={20} />
              <span>VIEW FULL REPORT</span>
            </button>
          </div>
        )}
      </div>

      {/* Info */}
      {!isComplete && (
        <div className="bg-retro-panel border-2 border-retro-yellow p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-retro-yellow flex-shrink-0" size={20} />
            <p className="font-terminal text-sm text-retro-dim">
              This audit may take 1-2 minutes to complete. Please do not close this window.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};