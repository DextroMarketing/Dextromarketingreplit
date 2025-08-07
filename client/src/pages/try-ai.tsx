import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Loader2, MessageSquare, PenTool, BarChart3, Image, Zap } from "lucide-react";
import { useMutation } from "@tanstack/react-query";

export default function TryAI() {
  const [textAnalysisInput, setTextAnalysisInput] = useState("");
  const [contentGenerationInput, setContentGenerationInput] = useState("");
  const [businessAnalysisInput, setBusinessAnalysisInput] = useState("");

  // Text Analysis Mutation
  const textAnalysisMutation = useMutation({
    mutationFn: async (text: string) => {
      const response = await fetch('/api/ai/analyze-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    }
  });

  // Content Generation Mutation
  const contentGenerationMutation = useMutation({
    mutationFn: async (prompt: string) => {
      const response = await fetch('/api/ai/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      if (!response.ok) throw new Error('Generation failed');
      return response.json();
    }
  });

  // Business Analysis Mutation
  const businessAnalysisMutation = useMutation({
    mutationFn: async (description: string) => {
      const response = await fetch('/api/ai/analyze-business', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description })
      });
      if (!response.ok) throw new Error('Analysis failed');
      return response.json();
    }
  });

  const handleTextAnalysis = () => {
    if (textAnalysisInput.trim()) {
      textAnalysisMutation.mutate(textAnalysisInput);
    }
  };

  const handleContentGeneration = () => {
    if (contentGenerationInput.trim()) {
      contentGenerationMutation.mutate(contentGenerationInput);
    }
  };

  const handleBusinessAnalysis = () => {
    if (businessAnalysisInput.trim()) {
      businessAnalysisMutation.mutate(businessAnalysisInput);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy/95 to-navy/90">
      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-black uppercase tracking-wider mb-6 text-white">
              Try Our
              <span className="block bg-clip-text bg-gradient-to-r from-dxm-orange to-dxm-gold text-[#ee9d2b]">
                AI Systems
              </span>
              <div className="h-2 bg-gradient-to-r from-dxm-orange to-dxm-gold rounded-full mt-4 mx-auto max-w-md"></div>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Experience the power of AI automation with our live demonstration tools. 
              See how artificial intelligence can transform your construction business operations.
            </p>
          </motion.div>
        </div>
      </section>
      {/* AI Showcase Tabs */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="text-analysis" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="text-analysis" className="text-sm font-semibold">
                <MessageSquare className="w-4 h-4 mr-2" />
                Text Analysis
              </TabsTrigger>
              <TabsTrigger value="content-generation" className="text-sm font-semibold">
                <PenTool className="w-4 h-4 mr-2" />
                Content Creation
              </TabsTrigger>
              <TabsTrigger value="business-analysis" className="text-sm font-semibold">
                <BarChart3 className="w-4 h-4 mr-2" />
                Business Insights
              </TabsTrigger>
            </TabsList>

            {/* Text Analysis Tab */}
            <TabsContent value="text-analysis">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-dxm-orange" />
                    Intelligent Text Analysis
                  </CardTitle>
                  <CardDescription>
                    Analyse customer reviews, feedback, or any text content to extract insights, 
                    sentiment, and key themes relevant to your construction business.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="text-analysis-input">Enter text to analyse</Label>
                    <Textarea
                      id="text-analysis-input"
                      placeholder="Paste customer review, feedback, or any text content here..."
                      value={textAnalysisInput}
                      onChange={(e) => setTextAnalysisInput(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    onClick={handleTextAnalysis}
                    disabled={textAnalysisMutation.isPending || !textAnalysisInput.trim()}
                    className="bg-dxm-orange hover:bg-dxm-orange/90"
                  >
                    {textAnalysisMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analysing...
                      </>
                    ) : (
                      'Analyse Text'
                    )}
                  </Button>

                  {textAnalysisMutation.data && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-semibold mb-3">Analysis Results:</h4>
                      <div className="space-y-3">
                        <div>
                          <span className="font-medium">Sentiment: </span>
                          <Badge variant={textAnalysisMutation.data.sentiment > 3 ? 'default' : 'destructive'}>
                            {textAnalysisMutation.data.rating}/5 stars
                          </Badge>
                        </div>
                        <div>
                          <span className="font-medium">Confidence: </span>
                          <span>{(textAnalysisMutation.data.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div>
                          <span className="font-medium">Key Insights: </span>
                          <p className="text-sm text-gray-600 mt-1">{textAnalysisMutation.data.summary}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {textAnalysisMutation.error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">
                        Analysis failed. Please check your input and try again.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Generation Tab */}
            <TabsContent value="content-generation">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PenTool className="w-5 h-5 text-dxm-orange" />
                    AI Content Generator
                  </CardTitle>
                  <CardDescription>
                    Generate marketing content, project descriptions, estimates, or any text 
                    content tailored for your construction business needs.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="content-prompt">Describe what you need</Label>
                    <Input
                      id="content-prompt"
                      placeholder="e.g., Write a marketing email for roofing services, Create a project proposal for kitchen renovation..."
                      value={contentGenerationInput}
                      onChange={(e) => setContentGenerationInput(e.target.value)}
                    />
                  </div>
                  <Button 
                    onClick={handleContentGeneration}
                    disabled={contentGenerationMutation.isPending || !contentGenerationInput.trim()}
                    className="bg-dxm-orange hover:bg-dxm-orange/90"
                  >
                    {contentGenerationMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      'Generate Content'
                    )}
                  </Button>

                  {contentGenerationMutation.data && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-semibold mb-3">Generated Content:</h4>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">{contentGenerationMutation.data.content}</p>
                      </div>
                    </motion.div>
                  )}

                  {contentGenerationMutation.error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">
                        Content generation failed. Please try a different prompt.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Business Analysis Tab */}
            <TabsContent value="business-analysis">
              <Card className="bg-white/95 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-dxm-orange" />
                    Business Intelligence
                  </CardTitle>
                  <CardDescription>
                    Get AI-powered insights and recommendations for your construction projects, 
                    market analysis, and business optimization strategies.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="business-input">Describe your business scenario</Label>
                    <Textarea
                      id="business-input"
                      placeholder="e.g., I'm a roofing contractor looking to expand into kitchen renovations. What should I consider? Or describe a current project challenge..."
                      value={businessAnalysisInput}
                      onChange={(e) => setBusinessAnalysisInput(e.target.value)}
                      className="min-h-[120px]"
                    />
                  </div>
                  <Button 
                    onClick={handleBusinessAnalysis}
                    disabled={businessAnalysisMutation.isPending || !businessAnalysisInput.trim()}
                    className="bg-dxm-orange hover:bg-dxm-orange/90"
                  >
                    {businessAnalysisMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analysing...
                      </>
                    ) : (
                      'Get AI Insights'
                    )}
                  </Button>

                  {businessAnalysisMutation.data && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 p-4 bg-gray-50 rounded-lg"
                    >
                      <h4 className="font-semibold mb-3">AI Business Insights:</h4>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 whitespace-pre-wrap">{businessAnalysisMutation.data.insights}</p>
                      </div>
                      {businessAnalysisMutation.data.recommendations && (
                        <div className="mt-4">
                          <h5 className="font-medium mb-2">Key Recommendations:</h5>
                          <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                            {businessAnalysisMutation.data.recommendations.map((rec: string, index: number) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </motion.div>
                  )}

                  {businessAnalysisMutation.error && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-700">
                        Business analysis failed. Please try rephrasing your scenario.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      {/* Features Overview */}
      <section className="py-16 px-4 bg-white/5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-black uppercase text-center mb-12 text-white">
            AI Capabilities
            <div className="h-1 bg-dxm-orange rounded-full mt-2 mx-auto max-w-xs"></div>
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-center"
            >
              <div className="bg-dxm-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-8 h-8 text-dxm-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Analysis</h3>
              <p className="text-gray-300">
                Analyse customer feedback, reviews, and communications to understand sentiment and extract actionable insights.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-dxm-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <PenTool className="w-8 h-8 text-dxm-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Content Creation</h3>
              <p className="text-gray-300">
                Generate marketing materials, project proposals, estimates, and professional content tailored to construction industry.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="bg-dxm-orange/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="w-8 h-8 text-dxm-orange" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Business Intelligence</h3>
              <p className="text-gray-300">
                Get strategic insights, market analysis, and data-driven recommendations for your construction business growth.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}